export const removeMenuText = () => {
    const menuButton = document.querySelector(".cd-megamenu-button") as HTMLElement

    if (menuButton) {
        const textNode = menuButton.childNodes[2]

        if (textNode) {
            menuButton.removeChild(textNode)
        }
    }
}
