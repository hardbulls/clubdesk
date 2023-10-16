export const alwaysShowMenuOnDesktop = () => {
    const desktopThreshold = "1020px"
    const desktopMediaQuery = window.matchMedia(`(min-width: ${desktopThreshold})`)

    const megaMenu = document.querySelector("div.cd-megamenu") as HTMLElement

    if (!megaMenu) {
        return
    }

    const mediaQueryHandler = (event: MediaQueryListEvent) => {
        if (event.matches) {
            megaMenu.style.display = "block"
            document.querySelector("body")?.classList.remove("cd-megamenu-open")
        } else {
            megaMenu.style.display = "none"
            document.querySelector("body")?.classList.remove("cd-megamenu-open")
        }
    }

    desktopMediaQuery.addEventListener("change", mediaQueryHandler)
}
