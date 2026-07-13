# Backend - DSA Based Search Engine

This directory contains the Express.js REST API for the DSA search engine. It is responsible for loading the preprocessed dataset into memory, building a Term Frequency-Inverse Document Frequency (TF-IDF) index, and computing cosine similarities to return the most relevant problem matches for user queries.

## 🚀 Tech Stack

- **Runtime:** Node.js (v22)
- **Framework:** Express.js
- **NLP:** Custom TF-IDF and Cosine Similarity implementation

## 📂 Directory Structure

- `index.js`: Main application entry point, sets up the Express server, builds the search index, and handles routing.
- `/utils`: Helper functions for preprocessing text (`preprocess.js`) and extracting platform names (`getSiteName.js`).
- `/dataset`: Contains the `preprocessed_all_problems.json` file which acts as the local in-memory database.

## ⚙️ Search Engine Core & NLP Pipeline

The search engine performs text-based vector search entirely in-memory using Term Frequency-Inverse Document Frequency (TF-IDF) and Cosine Similarity:

1. **In-Memory Loading:**
   On startup, the Express application parses the preprocessed JSON dataset containing problem titles, descriptions, and tags.
2. **TF-IDF Index Construction:**
   - Preprocesses the text (lowercasing, punctuation removal, tokenization, stopword filtering, and stemming).
   - Generates document terms. To emphasize search relevance, **titles** and **tags** are duplicated (multiplying their weight relative to descriptions).
   - Computes term frequencies (TF) and inverse document frequencies (IDF) to generate a TF-IDF weight vector for each problem in the database.
   - Calculates the magnitude (Euclidean norm) of each problem vector.
3. **Query Matching & Cosine Similarity:**
   - When a client sends a search query (`POST /search`), the query undergoes the exact same preprocessing and tokenization.
   - A query vector is created by computing the TF-IDF weights for each term in the query.
   - Express computes the **Cosine Similarity** between the query vector ($Q$) and each problem vector ($D$):
     $$\text{Similarity}(Q, D) = \frac{Q \cdot D}{\|Q\| \|D\|} = \frac{\sum (w_{t,Q} \times w_{t,D})}{\|Q\| \|D\|}$$
   - Compiles and ranks the scores, returning the top 10 problems with a score greater than `0`.

## 🛠️ Local Development (Without Docker)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in this directory to configure your local setup:
   ```env
   PORT=8001
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

### Option A: Unified Local Development (Docker Compose)
Run both frontend and backend on your local environment using the root orchestration configuration:
```bash
cd ..
docker-compose up --build
```

### Option B: Standalone Backend Production Deployment
Deploy the backend service in an isolated production environment containerized on port `8001` and connected to Caddy's external `proxy` network:
```bash
docker-compose -f docker-compose.yml up -d --build
```
This references the production-focused `backend/docker-compose.yml` configuration:
- Runs container `dsa-search-engine-backend` on port `8001`.
- Automatically loads variables from `.env.production`.
- Connects to the external network `proxy` for routing via Caddy.