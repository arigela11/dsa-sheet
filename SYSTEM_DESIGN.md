# DSA Sheet — System Design Document

## 1. System Design Overview (HLD)

### Architecture

```
[User Browser]
     │
     ▼
[React SPA] ─── Static assets on AWS S3 + CloudFront CDN
     │
     │  HTTPS REST API calls
     ▼
[AWS ALB] (Application Load Balancer)
     │
     ├──▶ [Node.js / Express] (EC2 / ECS) — Stateless API servers
     │         │
     │         ├── JWT Auth Middleware
     │         ├── /api/auth  → Authentication
     │         ├── /api/topics → DSA Topics
     │         └── /api/progress → User Progress
     │
     ▼
[MongoDB Atlas] (M10+ Cluster, Multi-region replica set)
     │
     ├── users collection
     ├── topics collection
     └── progresses collection
```

---

## 2. Request Flow

### Login Flow
1. User submits email + password to `POST /api/auth/login`
2. Server finds user by email (indexed), compares bcrypt hash
3. Signs JWT (7d expiry) and returns token + user object
4. Client stores JWT in `localStorage`
5. All subsequent requests attach `Authorization: Bearer <token>`

### Progress Tracking Flow
1. User clicks checkbox on a problem → optimistic UI update (instant)
2. `POST /api/progress/toggle { problemId }` fires in background
3. Server finds/creates progress doc for userId, toggles problemId in Map
4. Returns updated state; if error → UI reverts

### Authentication Mechanism
- **JWT (JSON Web Tokens)** — stateless, no session storage needed
- Token signed with `RS256` in production (HS256 for dev)
- Token expiry: 7 days; refresh via re-login
- Middleware validates token on every protected route

---

## 3. Database Schema (LLD)

### Users Collection
```json
{
  "_id": ObjectId,
  "name": "string",
  "email": "string (unique, indexed)",
  "password": "string (bcrypt hash)",
  "lastLogin": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
**Indexes:** `{ email: 1 }` unique

### Topics Collection
```json
{
  "_id": ObjectId,
  "title": "string",
  "slug": "string (unique, indexed)",
  "description": "string",
  "icon": "string",
  "color": "string (hex)",
  "order": "number",
  "subtopics": [
    {
      "_id": ObjectId,
      "title": "string",
      "order": "number",
      "problems": [
        {
          "_id": ObjectId,
          "title": "string",
          "difficulty": "Easy | Medium | Hard",
          "youtubeLink": "string",
          "leetcodeLink": "string",
          "articleLink": "string",
          "order": "number"
        }
      ]
    }
  ]
}
```
**Indexes:** `{ slug: 1 }` unique, `{ order: 1 }`
**Design note:** Problems embedded in topics (not separate collection) since they're always fetched together and never queried independently.

### Progresses Collection
```json
{
  "_id": ObjectId,
  "userId": "ObjectId (ref: User, indexed)",
  "completedProblems": {
    "topicSlug_subtopicIdx_problemId": true,
    ...
  },
  "problemNotes": {
    "topicSlug_subtopicIdx_problemId": "string",
    ...
  },
  "lastUpdated": "Date"
}
```
**Indexes:** `{ userId: 1 }` unique
**Design note:** Using MongoDB Map type for O(1) lookup of any problemId. One document per user keeps progress fetching to a single query.

### Entity Relationships
```
User (1) ──────── (1) Progress
User references are by ObjectId
Progress.completedProblems keys reference Topics → Subtopics → Problems
```

---

## 4. Scalability Considerations (10k–50k Active Users)

### Horizontal Scaling
- **Backend:** Stateless Express servers → deploy multiple instances behind AWS ALB
- **Frontend:** Static React build served via S3 + CloudFront (no compute needed)
- **Database:** MongoDB Atlas M10+ with replica sets; read from secondaries for topic reads

### Caching Strategy
- **Redis (ElastiCache):** Cache `/api/topics` response (rarely changes) — TTL 1 hour
- **CDN:** Static assets cached at edge via CloudFront
- **Client-side:** React state caches topics in memory for the session

### Rate Limiting
- Express middleware: 100 req/min per IP on auth routes, 500/min on general routes
- AWS WAF for DDoS protection

### Database Optimizations
- Progress stored as a single document per user → one query per page load
- Topics stored with embedded problems → single query returns full topic
- Batch progress updates via `/api/progress/bulk` to reduce round trips
- MongoDB Atlas auto-sharding if collection size exceeds 500GB

### Estimated Capacity
| Metric | Value |
|---|---|
| Concurrent users | 10k–50k |
| API requests/sec | ~500–2500 |
| MongoDB reads/sec | ~1000 (with caching) |
| Storage (50k users) | ~2GB progress data |
| Recommended Atlas tier | M10 (dev) → M30 (production) |

---

## 5. API Design

### Auth Endpoints
| Method | Path | Description | Auth |
|---|---|---|---|
| POST | /api/auth/register | Create new user | ❌ |
| POST | /api/auth/login | Login, get JWT | ❌ |
| GET | /api/auth/me | Get current user | ✅ |

### Topics Endpoints
| Method | Path | Description | Auth |
|---|---|---|---|
| GET | /api/topics | Get all topics | ❌ |
| GET | /api/topics/:slug | Get topic by slug | ✅ |

### Progress Endpoints
| Method | Path | Description | Auth |
|---|---|---|---|
| GET | /api/progress | Get user progress | ✅ |
| POST | /api/progress/toggle | Toggle one problem | ✅ |
| POST | /api/progress/bulk | Bulk update progress | ✅ |

---

## 6. AWS Deployment Architecture

```
Route 53 (DNS)
     │
     ▼
CloudFront CDN ──── S3 Bucket (React build)
     │
     ▼
ACM (SSL Certificate)
     │
     ▼
Application Load Balancer
     │
     ▼
ECS Fargate (Node.js containers) — Auto Scaling Group
     │
     ├── ECR (Docker image registry)
     ├── Secrets Manager (JWT secret, DB URI)
     └── CloudWatch (Logs, Metrics, Alarms)
     │
     ▼
MongoDB Atlas (VPC Peering with AWS VPC)
     │
     └── ElastiCache Redis (Optional caching layer)
```

### Deployment Steps
1. Build React app: `npm run build`
2. Upload to S3: `aws s3 sync build/ s3://your-bucket`
3. Invalidate CloudFront cache
4. Build Docker image for backend
5. Push to ECR, update ECS service

---

## 7. Trade-offs

| Decision | Choice | Trade-off |
|---|---|---|
| Progress storage | Map in single document | Fast reads; write conflicts if user has multiple tabs |
| Topics storage | Embedded problems | Simpler queries; harder to query problems across topics |
| Auth | JWT | Stateless, scalable; can't invalidate tokens before expiry |
| Frontend hosting | S3 + CloudFront | Cheapest; no SSR (SEO not a concern for authenticated app) |
| DB | MongoDB Atlas | Managed service cost; excellent horizontal scaling |
