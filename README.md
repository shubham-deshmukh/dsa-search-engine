# CP / DSA Search Engine 🔍

A modern, fast, and highly interactive full-stack search engine designed specifically for discovering Competitive Programming (CP) and Data Structures & Algorithms (DSA) problems across platforms like LeetCode, Codeforces.

## ✨ Key Features

- **Smart Search**: The backend manually computes Term Frequency-Inverse Document Frequency (TF-IDF) and Cosine Similarity from scratch, guaranteeing highly relevant search results without relying on external NLP libraries.
- **Debounced Auto-Search**: Say goodbye to mashing the Enter key. The search triggers automatically 500ms after you stop typing for a seamless, frictionless experience.
- **Full Keyboard Navigation**: Never take your hands off the keyboard. Navigate through search results using `ArrowUp` and `ArrowDown`, and hit `Enter` to instantly open a problem in a new tab.
- **Immersive Modal UI**: Clicking the search bar expands it and triggers a sleek, glassmorphic backdrop overlay, bringing your search into deep focus (inspired by Brave Search).
- **Rich Result Cards**: Search results are parsed into styled UI cards, displaying the problem title, description snippets, platform badges (e.g., Leetcode), and relevant algorithmic tags.
- **Smooth Animations**: Every interaction—from expanding the search bar, to hovering over results, to the appearance of the clear ('X') button—is beautifully animated using Framer Motion.
- **Custom Modern Scrollbars**: Features a custom-styled, slim scrollbar that blends perfectly with the dark mode aesthetic.
- **Backend Testing UI**: A custom-built, lightweight UI is served by the backend, allowing for quick testing and debugging of the `/search` API directly.

## 🛠️ Tech Stack

**Frontend:**
- React, React Router v7, TypeScript
- Tailwind CSS (v4)
- Framer Motion

**Backend:**
- Node.js & Express.js
- Custom TF-IDF & Cosine Similarity implementation

## 🚀 Getting Started

### Prerequisites
Ensure you have Node.js installed. This frontend expects the backend server running locally on port `8000`. 

The backend must expose a POST endpoint at `http://localhost:8000/search` that accepts the following JSON payload:
```json
{
  "query": "binary tree"
}
```

And returns a JSON response in the following format:
```json
{
  "results": [
    {
      "title": "Maximize the Number of Partitions After Operations",
      "url": "https://leetcode.com/problems/...",
      "platform": "Leetcode",
      "description": "Problem description snippet...",
      "tags": ["String", "Dynamic Programming"]
    }
  ]
}
```
*(Note: The frontend is resilient and will also safely catch and display `{"error": "message"}` responses, such as HTTP 400 Bad Requests).*

### Installation

1. Clone the repository.

2. **Start the Backend:**
   ```bash
   cd backend
   npm install
   node index.js
   # The backend testing UI can be accessed at http://localhost:8000
   ```
3. **Start the Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```