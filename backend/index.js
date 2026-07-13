import "dotenv/config";
import pkg from "natural";
import express from "express";
import cors from "cors";
import fsPromises from "fs/promises";
import preprocess from "./utils/preprocess.js";
import getSiteName from "./utils/getSiteName.js";

const app = express();
const PORT = process.env.PORT ||8000;

const corsUrls = process.env.CORS_ALLOWED_ORIGINS || process.env.FRONTEND_URL;
const allowedOrigins = corsUrls
  ? corsUrls.split(",").map((url) => url.trim())
  : "*";

// Enable CORS for frontend requests
app.use(cors({
  origin: allowedOrigins
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Root health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "healthy",
    message: "DSA Search Engine API is running successfully.",
    endpoints: {
      search: "POST /search"
    }
  });
});

let problems = [];
const { TfIdf } = pkg;
let tfIdf = new TfIdf();

let docVectors = [];
let docMagnitudes = [];

async function loadProblemsAndBuildIndex() {
  const data = await fsPromises.readFile(
    "./dataset/preprocessed_all_problems.json",
    "utf-8"
  );
  problems = JSON.parse(data);

  // Increase the weight of title and tags by duplicating them
  problems.forEach((problem, index) => {
    const tagsText = (problem.tags || []).join(" ");
    const text = preprocess(
      `${problem.title} ${problem.title} ${tagsText} ${tagsText} ${problem.description || ""}`
    );
    tfIdf.addDocument(text, index.toString());
  });

  // Build document vectors and magnitudes for cosine similarity
  docVectors = [];
  docMagnitudes = [];
  problems.forEach((_, idx) => {
    const vector = {};
    let sumSquares = 0;

    tfIdf.listTerms(idx).forEach(({ term, tfidf: weight }) => {
      vector[term] = weight;
      sumSquares += weight * weight;
    });

    docVectors[idx] = vector;
    docMagnitudes[idx] = Math.sqrt(sumSquares);
  });
}

/**
 * POST /search
 * Expects: { "query": "string" }
 * Returns: Array of { title, url }
 */
app.post("/search", (req, res) => {
  const { query } = req.body;

  // 1. Basic Validation
  if (!query || typeof query !== "string") {
    return res.status(400).json({
      error: "Please provide a search query string.",
    });
  }

  console.log(`Searching for: ${query}`);

  // Preprocess query and tokenize
  const processedQuery = preprocess(query);
  const tokens = processedQuery.split(" ").filter(Boolean);

  // Build the query TF×IDF vector
  const termFreq = {};
  tokens.forEach((t) => {
    termFreq[t] = (termFreq[t] || 0) + 1;
  });

  const queryVector = {};
  let sumOfSquareQ = 0;
  const N = tokens.length;
  Object.entries(termFreq).forEach(([term, count]) => {
    const tf = count / N;
    const idf = tfIdf.idf(term);
    const w = tf * idf;
    queryVector[term] = w;
    sumOfSquareQ += w * w;
  });

  const queryMag = Math.sqrt(sumOfSquareQ) || 1;

  // Compute cosine similarity against each document
  const scores = problems.map((_, idx) => {
    const docVec = docVectors[idx];
    const docMag = docMagnitudes[idx] || 1;
    let dot = 0;

    for (const [term, wq] of Object.entries(queryVector)) {
      if (docVec[term]) {
        dot += wq * docVec[term];
      }
    }

    const cosine = dot / (queryMag * docMag);
    return { idx, score: cosine };
  });

  // Consider top 10 positive scores
  const top = scores
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ idx }) => {
      const {title, url, tags} = problems[idx];
      const platform = getSiteName(url);
      return {title, url, platform, tags};
    });

  res.json({ results: top });
});

loadProblemsAndBuildIndex().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
  });
});
