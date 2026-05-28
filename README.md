# DSA Based Search Engine v2 🔍

A modern, fast, and highly interactive search engine interface designed specifically for discovering Data Structures and Algorithms (DSA) problems. 

## ✨ Key Features

- **Debounced Auto-Search**: Say goodbye to mashing the Enter key. The search triggers automatically 500ms after you stop typing for a seamless, frictionless experience.
- **Full Keyboard Navigation**: Never take your hands off the keyboard. Navigate through search results using `ArrowUp` and `ArrowDown`, and hit `Enter` to instantly open a problem in a new tab.
- **Immersive Modal UI**: Clicking the search bar expands it and triggers a sleek, glassmorphic backdrop overlay, bringing your search into deep focus (inspired by Brave Search).
- **Rich Result Cards**: Search results are parsed into styled UI cards, displaying the problem title, description snippets, platform badges (e.g., Leetcode), and relevant algorithmic tags.
- **Smooth Animations**: Every interaction—from expanding the search bar, to hovering over results, to the appearance of the clear ('X') button—is beautifully animated using Framer Motion.
- **Custom Modern Scrollbars**: Features a custom-styled, slim scrollbar that blends perfectly with the dark mode aesthetic.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS (v4)
- **Animations**: Framer Motion

## 🚀 Getting Started

### Prerequisites
This frontend expects a backend server running locally on port `8000`. 

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
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`