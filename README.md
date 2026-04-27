#  DSA Sheet — Full Stack MERN Application

A complete DSA (Data Structures & Algorithms) practice tracker built with MongoDB, Express, React, and Node.js.

##  Features
-  JWT Authentication (Login / Register)
- 10 DSA Topics with 70+ curated problems
- Progress tracking with persistent checkboxes
- Difficulty filtering (Easy / Medium / Hard)
- Resources: YouTube, LeetCode & Article links per problem
-  Dashboard with progress stats
-  Dark mode UI

---

##  Quick Start (Local)

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas free tier)
- npm

### 1. Clone & Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MONGO_URI and JWT_SECRET
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend
npm install
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm start
```

App runs at: **http://localhost:3000**
API runs at: **http://localhost:5000**

---

##  Docker (Easiest)

```bash
# From project root
docker-compose up --build
```

All 3 services (MongoDB, Backend, Frontend) start automatically.

---

##  AWS Deployment

### Frontend (S3 + CloudFront)
```bash
cd frontend
npm run build

# Create S3 bucket
aws s3 mb s3://your-dsa-sheet-bucket

# Upload build
aws s3 sync build/ s3://your-dsa-sheet-bucket --delete

# Enable static website hosting
aws s3 website s3://your-dsa-sheet-bucket --index-document index.html --error-document index.html
```

### Backend (EC2 / ECS)
```bash
# Build Docker image
cd backend
docker build -t dsa-sheet-backend .

# Push to ECR
aws ecr create-repository --repository-name dsa-sheet-backend
docker tag dsa-sheet-backend:latest <AWS_ACCOUNT>.dkr.ecr.<REGION>.amazonaws.com/dsa-sheet-backend
docker push <AWS_ACCOUNT>.dkr.ecr.<REGION>.amazonaws.com/dsa-sheet-backend

# Deploy on ECS Fargate or EC2
# See SYSTEM_DESIGN.md for full architecture
```

### Environment Variables (AWS Secrets Manager)
```
MONGO_URI=<MongoDB Atlas URI>
JWT_SECRET=<strong random string>
PORT=5000
FRONTEND_URL=<your CloudFront URL>
```

---

## Project Structure

```
dsa-sheet/
├── backend/
│   ├── models/
│   │   ├── User.js          # User schema
│   │   ├── Topic.js         # Topic + Problem schema
│   │   └── Progress.js      # User progress tracking
│   ├── routes/
│   │   ├── auth.js          # Login, register, me
│   │   ├── topics.js        # Get topics
│   │   └── progress.js      # Toggle/fetch progress
│   ├── middleware/
│   │   └── auth.js          # JWT validation
│   ├── server.js            # Express app entry
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── context/
│   │   │   ├── AuthContext.js     # Auth state + API client
│   │   │   └── ProgressContext.js # Progress state
│   │   ├── pages/
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── DashboardPage.js
│   │   │   └── TopicPage.js
│   │   ├── components/
│   │   │   └── Layout.js          # Navbar + footer
│   │   ├── data/
│   │   │   └── dsaData.js         # 70+ problems dataset
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── Dockerfile
│   └── nginx.conf
│
├── SYSTEM_DESIGN.md    # HLD + LLD + DB Schema
├── docker-compose.yml
└── README.md
```

---

## Database Schema

See **SYSTEM_DESIGN.md** for full schema and design decisions.

##  System Design

See **SYSTEM_DESIGN.md** for HLD architecture diagram, scalability plan, and API reference.
