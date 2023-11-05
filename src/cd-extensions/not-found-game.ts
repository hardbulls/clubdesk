import { STATIC_BASE_URL } from "../config"

export const notFoundGame = () => {
    if ((document.querySelector("h1") as HTMLElement)?.textContent === "Seite nicht gefunden.") {
        const container = document.querySelector(
            "div.cd-section-content > div.cd-row:nth-child(2) div.cd-block-content"
        ) as HTMLElement

        if (!container) {
            return
        }

        const frame = document.createElement("iframe") as HTMLIFrameElement

        frame.src = `${STATIC_BASE_URL}/game/`

        frame.style.minHeight = "600px"
        frame.style.height = "100%"
        frame.style.width = "100%"
        frame.setAttribute("scrolling", "no")
        frame.setAttribute("frameborder", "0")
        container.appendChild(frame)
    }
}
