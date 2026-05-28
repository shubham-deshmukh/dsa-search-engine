# DSA Based Search Engine v2

A full-stack search engine for Data Structures and Algorithms (DSA) problems. It allows users to query for programming problems and retrieves the most relevant results using Natural Language Processing (NLP) techniques, specifically Term Frequency-Inverse Document Frequency (TF-IDF) and Cosine Similarity.

## 🚀 Tech Stack

- **Frontend:** React Router, Node.js (v20)
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
   cd "DSA based search engine v2"
   ```

2. **Set up Environment Variables (Optional)**
   If your backend requires specific environment variables, create a `.env` file in the `backend` directory:
   ```bash
   # backend/.env
   PORT=8000
   ```

3. **Build and start the application**
   Run the following command from the root of the project:
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - **Frontend UI:** Open your browser and go to http://localhost:3000
   - **Backend API:** The API is available at http://localhost:8000

*To stop the containers, press `Ctrl+C` in your terminal or run `docker-compose down`.*

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
*Developed as a V2 improvement with full Docker orchestration.*