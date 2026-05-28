# Backend - DSA Based Search Engine v2

This directory contains the Express.js REST API for the DSA search engine. It is responsible for loading the preprocessed dataset into memory, building a Term Frequency-Inverse Document Frequency (TF-IDF) index, and computing cosine similarities to return the most relevant problem matches for user queries.

## 🚀 Tech Stack

- **Runtime:** Node.js (v20)
- **Framework:** Express.js
- **NLP:** Custom TF-IDF and Cosine Similarity implementation

## 📂 Directory Structure

- `index.js`: Main application entry point, sets up the Express server, builds the search index, and handles routing.
- `/utils`: Helper functions for preprocessing text (`preprocess.js`) and extracting platform names (`getSiteName.js`).
- `/dataset`: Contains the `preprocessed_all_problems.json` file which acts as the local in-memory database.

## 🛠️ Local Development (Without Docker)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in this directory to configure your local setup:
   ```env
   PORT=8000
   CORS_ALLOWED_ORIGINS=http://localhost:3000
   ```

3. **Start the Server**
   ```bash
   npm start
   ```
   *Note: The server will parse the dataset and build the TF-IDF vectors into memory before it starts accepting connections.*

## 🔗 API Endpoints

### `POST /search`
Performs a natural language search against the DSA problems dataset.

**Request Body:**
```json
{
  "query": "binary search tree traversal"
}
```

**Response:**
Returns a JSON object with a `results` array containing the top 10 matched problems.

## 🐳 Docker Deployment

This service is containerized. For the easiest setup alongside the frontend, run it from the root directory using Docker Compose:
```bash
cd ..
docker-compose up --build
```