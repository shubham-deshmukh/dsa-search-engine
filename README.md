# DSA Based Search Engine

**Live Demo:**
- **Frontend UI:** [https://dsa-search-engine.shubhamdeshmukh.dev/](https://dsa-search-engine.shubhamdeshmukh.dev/)
- **Backend API & UI:** [https://api-dsa-search-engine.shubhamdeshmukh.dev](https://api-dsa-search-engine.shubhamdeshmukh.dev)

A full-stack search engine for Data Structures and Algorithms (DSA) problems. It allows users to query for programming problems and retrieves the most relevant results using Natural Language Processing (NLP) techniques, specifically Term Frequency-Inverse Document Frequency (TF-IDF) and Cosine Similarity.

## 🚀 Tech Stack

- **Frontend:** React Router, Node.js (v22)
- **Backend:** Node.js, Express.js
- **NLP:** Custom manual implementation (TF-IDF and Cosine Similarity)
- **Deployment / Infrastructure:** Docker, Docker Compose

## 📦 Prerequisites

To run this application easily without needing to install Node.js locally, you need:

- Docker
- Docker Compose

## ️ Getting Started (Using Docker)

The easiest way to run both the frontend and the backend is using Docker Compose.

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dsa-search-engine
   ```

2. **Set up Environment Variables (Optional)**
   If your backend requires specific environment variables, create a `.env` file in the `backend` directory:
   ```bash
   # backend/.env
   PORT=8001
   ```

3. **Build and start the application**
   Run the following command from the root of the project:
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - **Frontend UI:** Open your browser and go to http://localhost:3000
   - **Backend API:** The API is available at http://localhost:8001

*To stop the containers, press `Ctrl+C` in your terminal or run `docker-compose down`.*

## 🏗️ System Architecture

This project is structured as a decoupled client-server application. Below is a diagram illustrating the production request flow and component connections:

```mermaid
graph TD
    Client[User Browser]
    Vercel[Vercel Frontend - https://dsa-search-engine.shubhamdeshmukh.dev]
    Caddy[Caddy Reverse Proxy - proxy network]
    Backend[Backend Express Container - dsa-search-engine-backend:8001]
    Dataset[(Local JSON Dataset / In-Memory Index)]

    Client -->|1. Load UI & Assets| Vercel
    Client -->|2. POST /search query| Caddy
    Caddy -->|3. Forward Proxy (Port 8001)| Backend
    Backend -->|4. Compute Cosine Similarity| Dataset
    Dataset -->|5. Return Ranked Search Results| Backend
    Backend -->|6. Return JSON response| Client
```

### Main Components
1. **Frontend UI:** 
   - A single-page React app powered by **React Router v7** and styled using **Tailwind CSS**.
   - Built to static assets and deployed on **Vercel** with automatic HTTPS configuration.
2. **Backend API:**
   - A lightweight **Node.js (v22)** and **Express.js** REST server.
   - Responsible for building the custom **TF-IDF (Term Frequency-Inverse Document Frequency)** vector search index in memory.
3. **Caddy Gateway:**
   - Serves as the SSL/TLS-terminating reverse proxy. 
   - Shares a Docker network (`proxy`) with the backend container, forwarding subdomain traffic (`api-dsa-search-engine.shubhamdeshmukh.dev`) directly to the backend.

## 📂 Project Structure

- `/frontend`: Contains the React Router application. Dockerized to build and serve the static files natively.
- `/backend`: Contains the Express server. Loads a local dataset (`preprocessed_all_problems.json`) into memory and builds the TF-IDF search index on startup.
- `docker-compose.yml`: Orchestrates both services, sets up internal networking, and manages environment variables (like CORS alignment).

## 🔗 API Endpoints

### `POST /search`
- **Description:** Performs a TF-IDF cosine similarity search against the dataset.
- **Payload:** `{ "query": "your search string" }`
- **Response:** Returns an array of the top 10 matched problems including `title`, `url`, `platform`, and `tags`.

---
*Developed with full Docker orchestration.*