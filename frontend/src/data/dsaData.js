// DSA Sheet Data - Curated problems across all major topics
const dsaTopics = [
  {
    title: "Arrays & Hashing",
    slug: "arrays-hashing",
    description: "Foundation of DSA — master array manipulation and hash maps",
    icon: "🗂️",
    color: "#3b82f6",
    order: 1,
    subtopics: [
      {
        title: "Basic Array Operations",
        order: 1,
        problems: [
          { title: "Two Sum", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/two-sum/", youtubeLink: "https://www.youtube.com/watch?v=KLlXCFG5TnA", articleLink: "https://neetcode.io/problems/two-integer-sum", order: 1 },
          { title: "Best Time to Buy & Sell Stock", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", youtubeLink: "https://www.youtube.com/watch?v=1pkOgXD63yU", articleLink: "https://neetcode.io/problems/buy-and-sell-crypto", order: 2 },
          { title: "Contains Duplicate", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/contains-duplicate/", youtubeLink: "https://www.youtube.com/watch?v=3OamzN90kPg", articleLink: "https://neetcode.io/problems/duplicate-integer", order: 3 },
          { title: "Product of Array Except Self", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/product-of-array-except-self/", youtubeLink: "https://www.youtube.com/watch?v=bNvIQI2wAjk", articleLink: "https://neetcode.io/problems/products-of-array-discluding-self", order: 4 },
          { title: "Maximum Subarray (Kadane's)", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/maximum-subarray/", youtubeLink: "https://www.youtube.com/watch?v=5WZl3MMT0Eg", articleLink: "https://neetcode.io/problems/maximum-subarray", order: 5 }
        ]
      },
      {
        title: "Hashing Techniques",
        order: 2,
        problems: [
          { title: "Valid Anagram", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/valid-anagram/", youtubeLink: "https://www.youtube.com/watch?v=9UtInBqnCgA", articleLink: "https://neetcode.io/problems/is-anagram", order: 1 },
          { title: "Group Anagrams", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/group-anagrams/", youtubeLink: "https://www.youtube.com/watch?v=vzdNOK2oB2E", articleLink: "https://neetcode.io/problems/anagram-groups", order: 2 },
          { title: "Top K Frequent Elements", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/top-k-frequent-elements/", youtubeLink: "https://www.youtube.com/watch?v=YPTqKIgVk-k", articleLink: "https://neetcode.io/problems/top-k-elements-in-list", order: 3 },
          { title: "Longest Consecutive Sequence", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-consecutive-sequence/", youtubeLink: "https://www.youtube.com/watch?v=P6RZZMu_maU", articleLink: "https://neetcode.io/problems/longest-consecutive-sequence", order: 4 }
        ]
      }
    ]
  },
  {
    title: "Two Pointers",
    slug: "two-pointers",
    description: "Efficient O(n) solutions using two pointer technique",
    icon: "👆",
    color: "#8b5cf6",
    order: 2,
    subtopics: [
      {
        title: "Classic Two Pointer",
        order: 1,
        problems: [
          { title: "Valid Palindrome", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/valid-palindrome/", youtubeLink: "https://www.youtube.com/watch?v=jJXJ16kPFWg", articleLink: "https://neetcode.io/problems/is-palindrome", order: 1 },
          { title: "Two Sum II - Sorted Array", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", youtubeLink: "https://www.youtube.com/watch?v=cQ1Oz4ckceM", articleLink: "https://neetcode.io/problems/two-integer-sum-ii", order: 2 },
          { title: "3Sum", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/3sum/", youtubeLink: "https://www.youtube.com/watch?v=jzZsG8n2R9A", articleLink: "https://neetcode.io/problems/three-integer-sum", order: 3 },
          { title: "Container With Most Water", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/container-with-most-water/", youtubeLink: "https://www.youtube.com/watch?v=UuiTKBwPgAo", articleLink: "https://neetcode.io/problems/max-water-container", order: 4 },
          { title: "Trapping Rain Water", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/trapping-rain-water/", youtubeLink: "https://www.youtube.com/watch?v=ZI2z5pq0TqA", articleLink: "https://neetcode.io/problems/trapping-rain-water", order: 5 }
        ]
      }
    ]
  },
  {
    title: "Sliding Window",
    slug: "sliding-window",
    description: "Variable and fixed window techniques for substring/subarray problems",
    icon: "🪟",
    color: "#10b981",
    order: 3,
    subtopics: [
      {
        title: "Fixed Window",
        order: 1,
        problems: [
          { title: "Maximum Average Subarray I", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/maximum-average-subarray-i/", youtubeLink: "https://www.youtube.com/watch?v=8sGNVLEZLMQ", articleLink: "https://leetcode.com/problems/maximum-average-subarray-i/editorial/", order: 1 },
          { title: "Maximum Sum of Distinct Subarrays", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/", youtubeLink: "https://www.youtube.com/watch?v=UCDhDSKWKFM", articleLink: "https://neetcode.io", order: 2 }
        ]
      },
      {
        title: "Variable Window",
        order: 2,
        problems: [
          { title: "Longest Substring Without Repeating Characters", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", youtubeLink: "https://www.youtube.com/watch?v=wiGpQwVHdE0", articleLink: "https://neetcode.io/problems/longest-substring-without-duplicates", order: 1 },
          { title: "Longest Repeating Character Replacement", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-repeating-character-replacement/", youtubeLink: "https://www.youtube.com/watch?v=gqXU1UyA8pk", articleLink: "https://neetcode.io/problems/longest-repeating-substring-with-replacement", order: 2 },
          { title: "Minimum Window Substring", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/minimum-window-substring/", youtubeLink: "https://www.youtube.com/watch?v=jSto0O4AJbM", articleLink: "https://neetcode.io/problems/minimum-window-with-characters", order: 3 },
          { title: "Sliding Window Maximum", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/sliding-window-maximum/", youtubeLink: "https://www.youtube.com/watch?v=DfljaUwZsOk", articleLink: "https://neetcode.io/problems/sliding-window-maximum", order: 4 }
        ]
      }
    ]
  },
  {
    title: "Stack",
    slug: "stack",
    description: "LIFO data structure for parsing, monotonic problems",
    icon: "📚",
    color: "#f59e0b",
    order: 4,
    subtopics: [
      {
        title: "Basic Stack",
        order: 1,
        problems: [
          { title: "Valid Parentheses", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/valid-parentheses/", youtubeLink: "https://www.youtube.com/watch?v=WTzjTskDFMg", articleLink: "https://neetcode.io/problems/validate-parentheses", order: 1 },
          { title: "Min Stack", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/min-stack/", youtubeLink: "https://www.youtube.com/watch?v=qkLl7nAwDPo", articleLink: "https://neetcode.io/problems/minimum-stack", order: 2 },
          { title: "Evaluate Reverse Polish Notation", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", youtubeLink: "https://www.youtube.com/watch?v=iu0082c4HDE", articleLink: "https://neetcode.io/problems/evaluate-reverse-polish-notation", order: 3 }
        ]
      },
      {
        title: "Monotonic Stack",
        order: 2,
        problems: [
          { title: "Daily Temperatures", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/daily-temperatures/", youtubeLink: "https://www.youtube.com/watch?v=cTBiBSnjO3c", articleLink: "https://neetcode.io/problems/daily-temperatures", order: 1 },
          { title: "Car Fleet", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/car-fleet/", youtubeLink: "https://www.youtube.com/watch?v=Pr6T-3yB9RM", articleLink: "https://neetcode.io/problems/car-fleet", order: 2 },
          { title: "Largest Rectangle in Histogram", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/largest-rectangle-in-histogram/", youtubeLink: "https://www.youtube.com/watch?v=zx5Sw9130L0", articleLink: "https://neetcode.io/problems/largest-rectangle-in-histogram", order: 3 }
        ]
      }
    ]
  },
  {
    title: "Binary Search",
    slug: "binary-search",
    description: "Divide and conquer on sorted structures",
    icon: "🔍",
    color: "#ef4444",
    order: 5,
    subtopics: [
      {
        title: "Classic Binary Search",
        order: 1,
        problems: [
          { title: "Binary Search", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/binary-search/", youtubeLink: "https://www.youtube.com/watch?v=s4DPM8ct1pI", articleLink: "https://neetcode.io/problems/binary-search", order: 1 },
          { title: "Search a 2D Matrix", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/search-a-2d-matrix/", youtubeLink: "https://www.youtube.com/watch?v=Ber2pi2C0j0", articleLink: "https://neetcode.io/problems/search-2d-matrix", order: 2 },
          { title: "Koko Eating Bananas", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/koko-eating-bananas/", youtubeLink: "https://www.youtube.com/watch?v=U2SozAs9RzA", articleLink: "https://neetcode.io/problems/eating-bananas", order: 3 },
          { title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", youtubeLink: "https://www.youtube.com/watch?v=nIVW4P8b1VA", articleLink: "https://neetcode.io/problems/find-minimum-in-rotated-sorted-array", order: 4 },
          { title: "Median of Two Sorted Arrays", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/median-of-two-sorted-arrays/", youtubeLink: "https://www.youtube.com/watch?v=q6IEA26hvXc", articleLink: "https://neetcode.io/problems/median-of-two-sorted-arrays", order: 5 }
        ]
      }
    ]
  },
  {
    title: "Linked List",
    slug: "linked-list",
    description: "Pointer manipulation, reversal, cycle detection",
    icon: "🔗",
    color: "#06b6d4",
    order: 6,
    subtopics: [
      {
        title: "Basic Operations",
        order: 1,
        problems: [
          { title: "Reverse a Linked List", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/reverse-linked-list/", youtubeLink: "https://www.youtube.com/watch?v=G0_I-ZF0S38", articleLink: "https://neetcode.io/problems/reverse-a-linked-list", order: 1 },
          { title: "Merge Two Sorted Lists", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/merge-two-sorted-lists/", youtubeLink: "https://www.youtube.com/watch?v=XIdigk956u0", articleLink: "https://neetcode.io/problems/merge-two-sorted-linked-lists", order: 2 },
          { title: "Reorder List", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/reorder-list/", youtubeLink: "https://www.youtube.com/watch?v=S5bfdUTrKLM", articleLink: "https://neetcode.io/problems/reorder-linked-list", order: 3 }
        ]
      },
      {
        title: "Fast & Slow Pointers",
        order: 2,
        problems: [
          { title: "Linked List Cycle", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/linked-list-cycle/", youtubeLink: "https://www.youtube.com/watch?v=gBTe7lFR3vc", articleLink: "https://neetcode.io/problems/linked-list-cycle-detection", order: 1 },
          { title: "Find the Duplicate Number", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/find-the-duplicate-number/", youtubeLink: "https://www.youtube.com/watch?v=wjYnzkAhcNk", articleLink: "https://neetcode.io/problems/find-duplicate-integer", order: 2 },
          { title: "LRU Cache", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/lru-cache/", youtubeLink: "https://www.youtube.com/watch?v=7ABFKPK2hD4", articleLink: "https://neetcode.io/problems/lru-cache", order: 3 },
          { title: "Merge K Sorted Lists", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/merge-k-sorted-lists/", youtubeLink: "https://www.youtube.com/watch?v=q5a5OiGbT6Q", articleLink: "https://neetcode.io/problems/merge-k-sorted-linked-lists", order: 4 }
        ]
      }
    ]
  },
  {
    title: "Trees",
    slug: "trees",
    description: "Binary trees, BST, traversals and tree DP",
    icon: "🌳",
    color: "#22c55e",
    order: 7,
    subtopics: [
      {
        title: "Tree Traversals",
        order: 1,
        problems: [
          { title: "Invert Binary Tree", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/invert-binary-tree/", youtubeLink: "https://www.youtube.com/watch?v=OnSn2XEQ4MY", articleLink: "https://neetcode.io/problems/invert-a-binary-tree", order: 1 },
          { title: "Maximum Depth of Binary Tree", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", youtubeLink: "https://www.youtube.com/watch?v=hTM3phVI6YQ", articleLink: "https://neetcode.io/problems/depth-of-binary-tree", order: 2 },
          { title: "Level Order Traversal", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/binary-tree-level-order-traversal/", youtubeLink: "https://www.youtube.com/watch?v=6ZnyEApgFYg", articleLink: "https://neetcode.io/problems/level-order-traversal-of-binary-tree", order: 3 },
          { title: "Binary Tree Right Side View", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/binary-tree-right-side-view/", youtubeLink: "https://www.youtube.com/watch?v=d4zLyf32e3I", articleLink: "https://neetcode.io/problems/binary-tree-right-side-view", order: 4 }
        ]
      },
      {
        title: "BST",
        order: 2,
        problems: [
          { title: "Validate BST", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/validate-binary-search-tree/", youtubeLink: "https://www.youtube.com/watch?v=s6ATEkipzow", articleLink: "https://neetcode.io/problems/valid-binary-search-tree", order: 1 },
          { title: "Kth Smallest Element in BST", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", youtubeLink: "https://www.youtube.com/watch?v=5LUXSvjmGCw", articleLink: "https://neetcode.io/problems/kth-smallest-integer-in-bst", order: 2 },
          { title: "Lowest Common Ancestor of BST", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", youtubeLink: "https://www.youtube.com/watch?v=gs2LMfuOR9k", articleLink: "https://neetcode.io/problems/lowest-common-ancestor-in-binary-search-tree", order: 3 }
        ]
      },
      {
        title: "Hard Tree Problems",
        order: 3,
        problems: [
          { title: "Binary Tree Maximum Path Sum", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", youtubeLink: "https://www.youtube.com/watch?v=Hr5cWUld4vU", articleLink: "https://neetcode.io/problems/binary-tree-maximum-path-sum", order: 1 },
          { title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", youtubeLink: "https://www.youtube.com/watch?v=u4JAi2JJhI8", articleLink: "https://neetcode.io/problems/serialize-and-deserialize-binary-tree", order: 2 }
        ]
      }
    ]
  },
  {
    title: "Graphs",
    slug: "graphs",
    description: "BFS, DFS, Union-Find, shortest paths",
    icon: "🕸️",
    color: "#ec4899",
    order: 8,
    subtopics: [
      {
        title: "Graph Traversal",
        order: 1,
        problems: [
          { title: "Number of Islands", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/number-of-islands/", youtubeLink: "https://www.youtube.com/watch?v=pV2kpPD66nE", articleLink: "https://neetcode.io/problems/count-number-of-islands", order: 1 },
          { title: "Clone Graph", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/clone-graph/", youtubeLink: "https://www.youtube.com/watch?v=mQeF6bN8hMk", articleLink: "https://neetcode.io/problems/clone-graph", order: 2 },
          { title: "Pacific Atlantic Water Flow", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/pacific-atlantic-water-flow/", youtubeLink: "https://www.youtube.com/watch?v=s-VIfLJnP-8", articleLink: "https://neetcode.io/problems/pacific-atlantic-water-flow", order: 3 },
          { title: "Surrounded Regions", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/surrounded-regions/", youtubeLink: "https://www.youtube.com/watch?v=9z2BunfoZ5Y", articleLink: "https://neetcode.io/problems/surrounded-regions", order: 4 }
        ]
      },
      {
        title: "Advanced Graphs",
        order: 2,
        problems: [
          { title: "Course Schedule", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/course-schedule/", youtubeLink: "https://www.youtube.com/watch?v=EgI5nU9etnU", articleLink: "https://neetcode.io/problems/course-schedule", order: 1 },
          { title: "Word Ladder", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/word-ladder/", youtubeLink: "https://www.youtube.com/watch?v=h9iTnkgv05E", articleLink: "https://neetcode.io/problems/word-ladder", order: 2 },
          { title: "Alien Dictionary", difficulty: "Hard", leetcodeLink: "https://neetcode.io/problems/foreign-dictionary", youtubeLink: "https://www.youtube.com/watch?v=6kTZYvNNyps", articleLink: "https://neetcode.io/problems/foreign-dictionary", order: 3 }
        ]
      }
    ]
  },
  {
    title: "Dynamic Programming",
    slug: "dynamic-programming",
    description: "1D & 2D DP, knapsack, LCS, and classic patterns",
    icon: "⚡",
    color: "#f97316",
    order: 9,
    subtopics: [
      {
        title: "1D DP",
        order: 1,
        problems: [
          { title: "Climbing Stairs", difficulty: "Easy", leetcodeLink: "https://leetcode.com/problems/climbing-stairs/", youtubeLink: "https://www.youtube.com/watch?v=Y0lT9Fck7qI", articleLink: "https://neetcode.io/problems/climbing-stairs", order: 1 },
          { title: "House Robber", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/house-robber/", youtubeLink: "https://www.youtube.com/watch?v=73r3KWiEvyk", articleLink: "https://neetcode.io/problems/house-robber", order: 2 },
          { title: "Longest Increasing Subsequence", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-increasing-subsequence/", youtubeLink: "https://www.youtube.com/watch?v=cjWnW0hdF1Y", articleLink: "https://neetcode.io/problems/longest-increasing-subsequence", order: 3 },
          { title: "Word Break", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/word-break/", youtubeLink: "https://www.youtube.com/watch?v=Sx9NNgInc3A", articleLink: "https://neetcode.io/problems/word-break", order: 4 }
        ]
      },
      {
        title: "2D DP",
        order: 2,
        problems: [
          { title: "Unique Paths", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/unique-paths/", youtubeLink: "https://www.youtube.com/watch?v=IlEsdxuD4lY", articleLink: "https://neetcode.io/problems/count-paths", order: 1 },
          { title: "Coin Change", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/coin-change/", youtubeLink: "https://www.youtube.com/watch?v=H9bfqozjoqs", articleLink: "https://neetcode.io/problems/coin-change", order: 2 },
          { title: "Longest Common Subsequence", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/longest-common-subsequence/", youtubeLink: "https://www.youtube.com/watch?v=Ua0GhGs6Y4w", articleLink: "https://neetcode.io/problems/longest-common-subsequence", order: 3 },
          { title: "Edit Distance", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/edit-distance/", youtubeLink: "https://www.youtube.com/watch?v=XYi2-LPrwm4", articleLink: "https://neetcode.io/problems/edit-distance", order: 4 },
          { title: "Burst Balloons", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/burst-balloons/", youtubeLink: "https://www.youtube.com/watch?v=VFskby7lUbw", articleLink: "https://neetcode.io/problems/burst-balloons", order: 5 }
        ]
      }
    ]
  },
  {
    title: "Heaps / Priority Queue",
    slug: "heaps",
    description: "Min/Max heaps, top-K problems, and heap-based algorithms",
    icon: "⛺",
    color: "#14b8a6",
    order: 10,
    subtopics: [
      {
        title: "Heap Basics",
        order: 1,
        problems: [
          { title: "Kth Largest Element in Array", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/kth-largest-element-in-an-array/", youtubeLink: "https://www.youtube.com/watch?v=XEmy13g1Qxc", articleLink: "https://neetcode.io/problems/kth-largest-element-in-an-array", order: 1 },
          { title: "K Closest Points to Origin", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/k-closest-points-to-origin/", youtubeLink: "https://www.youtube.com/watch?v=rI2EBUEMfTk", articleLink: "https://neetcode.io/problems/k-closest-points-to-the-origin", order: 2 },
          { title: "Task Scheduler", difficulty: "Medium", leetcodeLink: "https://leetcode.com/problems/task-scheduler/", youtubeLink: "https://www.youtube.com/watch?v=s8p8ukTyA2I", articleLink: "https://neetcode.io/problems/task-scheduling", order: 3 },
          { title: "Find Median from Data Stream", difficulty: "Hard", leetcodeLink: "https://leetcode.com/problems/find-median-from-data-stream/", youtubeLink: "https://www.youtube.com/watch?v=itmhHWaHupI", articleLink: "https://neetcode.io/problems/find-median-in-a-data-stream", order: 4 }
        ]
      }
    ]
  }
];

module.exports = dsaTopics;
