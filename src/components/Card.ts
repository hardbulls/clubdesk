import { register } from "./framework/register"

export class Card extends HTMLElement {
    constructor() {
        super()
        // Attach the shadow root
        const shadow = this.attachShadow({ mode: "open" })

        // Create a style element
        const style = document.createElement("style")
        style.textContent = `
            :host {
                border: 1px solid var(--stroke-gray);
                border-radius: 15px;
                padding: 16px;
                display: flex;
                flex-direction: column;
                width: 100%;
            }

        `

        shadow.appendChild(style)

        const children = this.querySelectorAll("*")

        for (const child of children) {
            shadow.append(child)
        }
    }
}

register("card", Card)
