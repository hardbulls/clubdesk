export const STATIC_BASE_URL = process.env["NODE_ENV"] === "production" ? "https://static.hardbulls.com/" : ""
export const API_BASE_URL = `${STATIC_BASE_URL}api/`
export const API_V2_BASE_URL = `https://api.hardbulls.com/api/`
