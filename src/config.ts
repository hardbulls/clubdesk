
export const STATIC_BASE_URL = process.env["NODE_ENV"] === "production" ? "https://static.hardbulls.com/" : ""
export const API_BASE_URL = `${STATIC_BASE_URL}api/`