export const newsOverviewAuthorSubheading = () => {
    const overviewSubheadings = document.querySelectorAll("div.cd-tile-v-main-subheading") as NodeListOf<HTMLElement>

    for (const overviewSubheading of Array.from(overviewSubheadings)) {
        if (overviewSubheading.childNodes[2]) {
            overviewSubheading.childNodes[2].textContent = overviewSubheading.childNodes[2].textContent?.trim() || ""
        }
    }
}

export const replaceAlternateLinks = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const cParam = urlParams.get("c")

    if (cParam === "NL") {
        const newsTiles = document.querySelectorAll(".cd-newslist-tile-v .cd-tile-v-box")

        for (const newsTile of newsTiles) {
            const onClickAttribute = newsTile.getAttribute("onclick")
            if (onClickAttribute) {
                newsTile.setAttribute("onclick", onClickAttribute.replace("/willkommen", "/"))
            }
        }
    }
}

export const moveNewsSubheading = () => {
    const detailSection = document.querySelector("div.cd-detailPageNavigation") as HTMLElement
    const detailSubheading = document.querySelector("div.cd-news-detail div.cd-additional-subheading") as HTMLElement

    if (detailSection) {
        detailSection.style.display = "flex"
        detailSection.style.justifyContent = "space-between"

        if (detailSubheading) {
            detailSection.appendChild(detailSubheading)

            const childNode3 = detailSubheading.childNodes[2]

            // Remove ", " if author is empty
            if (childNode3 && childNode3.textContent?.trim() === ",") {
                detailSubheading.removeChild(childNode3)
            } else if (childNode3) {
                childNode3.textContent = childNode3.textContent?.trim() || ""
            }
        }

        const backLink = detailSection.querySelector("a")

        if (backLink) {
            const urlParams = new URLSearchParams(window.location.search)
            const cParam = urlParams.get("c")
            const originalHref = backLink.href

            backLink.href = "/"

            if (cParam && cParam.startsWith("NL")) {
                backLink.onclick = (event) => {
                    event.preventDefault()

                    window.location.href = originalHref.replace("/willkommen", "/")
                }
            }
        }
    }
}
