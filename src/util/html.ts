export const replaceElementChildren = (element: HTMLElement|JSX.Element, nodes: JSX.Element | Array<JSX.Element>): void => {
    if (!Array.isArray(nodes)) {
        nodes = [nodes]
    }

    // @ts-ignore Typescript doesn't know that it actually is a HTMLElement
    element.replaceChildren(...nodes)
}

export const appendElement = (element: HTMLElement, nodes: JSX.Element | Array<JSX.Element>): void => {
    if (Array.isArray(nodes)) {
        for (const child of nodes) {
            // @ts-ignore Typescript doesn't know that it actually is a HTMLElement
            element.appendChild(child)
        }

        return
    }

    // @ts-ignore Typescript doesn't know that it actually is a HTMLElement
    element.appendChild(nodes)
}

export const appendToElement = (selector: string, createElement: () => JSX.Element) => {
    const container = document.querySelector(selector) as HTMLElement

    if (container) {
        appendElement(container, createElement())
    }
}

export const escapeHtmlEntities = (input: string): string => {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}
