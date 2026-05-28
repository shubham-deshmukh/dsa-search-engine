# Frontend - DSA Based Search Engine v2

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