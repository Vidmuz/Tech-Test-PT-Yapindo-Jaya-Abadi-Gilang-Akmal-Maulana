// ============================================================
// Axios Instance — GitHub API
// ============================================================

import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
    // Optionally use a GitHub token from environment for higher rate limits
    ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` }
      : {}),
  },
  timeout: 15000,
});

// Response interceptor — normalize errors
githubApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      // Request was cancelled — not a real error
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const message =
      status === 403
        ? "GitHub API rate limit exceeded. Please wait a moment and try again."
        : status === 404
          ? "Resource not found."
          : status === 422
            ? "Validation failed. Please check your search query."
            : error.message || "An unexpected error occurred.";

    error.userMessage = message;
    return Promise.reject(error);
  }
);

export default githubApi;
