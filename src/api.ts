import { API_BASE_URL } from "./config"

const CACHE: { [key: string]: any } = {}

export const fetchV2Api = async (url: string) => {
    let response = CACHE[url]

    if (!response) {
        response = await fetch(`${API_BASE_URL}${url}`).then((response) => response.json())

        CACHE[url] = response
    }

    return response
}
