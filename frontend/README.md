# Frontend - DSA Based Search Engine

This directory contains the frontend user interface for the DSA search engine. It is built using React Router and allows users to seamlessly search for Data Structures and Algorithms programming problems using Natural Language queries.

## 🚀 Tech Stack

- **Framework:** React Router
- **Environment:** Node.js (v20)

## 🛠️ Local Development (Without Docker)

To run the frontend locally without Docker, ensure you have Node.js installed.

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   *(Note: Adjust the script to `npm start` if that is what is defined in your `package.json`)*

## 🐳 Docker Deployment

This application is containerized and optimized using a multi-stage Docker build. It is highly recommended to run it via Docker Compose from the root of the project to ensure proper networking with the backend API.

```bash
cd ..
docker-compose up --build
```

Once started, the frontend will be accessible in your browser at `http://localhost:3000`.

## 🏗️ Client Architecture & Serving Logic

The frontend is configured as a Single Page Application (SPA) utilizing the following structure:

1. **Routing and Page Structure:**
   - Powered by **React Router v7** in SPA mode (server-side rendering is disabled with `ssr: false`).
   - Dynamically loads page layouts, assets, and components directly in the user's browser.
2. **Search Logic & API Connection:**
   - Exposes an interactive search input component that captures user search queries.
   - Employs debounced queries (triggering automatically `500ms` after typing pauses) and manually triggered queries.
   - Fires asynchronous HTTP POST fetches directly to the backend API (`VITE_BACKEND_URL`) from the client side.
3. **Animations and UI Interactions:**
   - Integrated with **Framer Motion** (`motion/react`) to drive fluid micro-interactions (collapsible/expandable search bars, dropdown fade-ins, and list item transitions).
4. **Production Build & Lightweight Static Serving:**
   - During production Docker builds, the application outputs static assets under `build/client`.
   - The final slim container uses the lightweight **`serve`** package to host the static folder on port `3000`, drastically reducing the production image footprint.