import { register } from "./framework/register"
import { InvalidChildrenError } from "./framework/InvalidChildrenError"

export class Table extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })
        const style = document.createElement("style")
        style.textContent = `
            :host {
                background: red;
            }
            
            :host table {
                width: 100%;
                border: 0;
                border-spacing: 0;
            }

            :host th {
                border-bottom: 2px solid var(--color-bulls-light-red);
            }

            :host th, :host td  {
                text-align: left;
                border-collapse: collapse;
                padding: 3px;
                border-right: 1px solid var(--color-light-gray);
            }

            :host td {
                border-bottom: 1px solid var(--color-light-gray);
            }

            :host tbody > tr:hover {
                background-color: var(--color-bulls-very-light-red);
            }

            :host table tr:last-child td {
                border-bottom: 0;
            }

            :host table tr td:last-child,th:last-child {
                border-right: 0;
            }
        `

        shadow.appendChild(style)

        const table = this.querySelector("table")

        if (!table) {
            throw new InvalidChildrenError(this, ["table"])
        }

        shadow.appendChild(table)
    }
}

register("table", Table)
