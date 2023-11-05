import { API_BASE_URL } from "./config"

export const fetchApi = async (url: string) => {
    return await fetch(`${API_BASE_URL}${url}`).then((response) => response.json())
}
