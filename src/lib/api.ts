import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com/users",
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN_FOR_REQUESTS}`,
    "User-Agent": "github-user-fetcher" 
  }
});