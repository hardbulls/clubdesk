const BASE_URL = process.env["NODE_ENV"] === "production" ? "https://static.hardbulls.com/api/" : "api/"

export const fetchApi = async (url: string) => {
    return await fetch(`${BASE_URL}${url}`).then((response) => response.json())
}
