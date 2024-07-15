import { InvalidChildrenError } from "./framework/InvalidChildrenError"
import { register } from "./framework/register"

export class Select extends HTMLElement {
    constructor() {
        super()
        // Attach the shadow root
        const shadow = this.attachShadow({ mode: "open" })

        // Create a style element
        const style = document.createElement("style")
        style.textContent = `
            :host {
                display: flex;
                flex-direction: column;
                row-gap: var(--gap-xs);
                width: max-content;
            }

            :host .label {
                font-size: var(--font-size-sm);
                font-weight: bold;
            }

            :host .container {
                position: relative;
                display: flex;
                height: 2em;
                border-radius: .25em;
                overflow: hidden;
            }

            :host .container::after {
                content: '\\25BC';
                position: absolute;
                top: 0;
                right: 0;
                padding: 6px;
                background-color: var(--background-gray-transparent);
                transition: .25s all ease;
                pointer-events: none;
            }

            :host .container:hover::after {
                color: var(--color-bulls-red);
            }

            :host select {
                /* Reset Select */
                appearance: none;
                outline: 10px red;
                border: 0;
                box-shadow: none;
                width: 100%;

                /* Personalize */
                flex: 1;
                padding-inline: 12px;
                padding-block: 0;
                color: var(--text-default);
                background-color: var(--background-gray-transparent);
                background-image: none;
                cursor: pointer;

                padding-right: 36px;
            }
        `

        const label = document.createElement("div")

        label.classList.add("label")

        const select = this.querySelector("select")
        const selectContainer = document.createElement("div")

        selectContainer.classList.add("container")

        if (!select) {
            throw new InvalidChildrenError(this, ["select"])
        }

        selectContainer.append(select)

        shadow.append(style, label, selectContainer)
    }
}

register("select", Select)
