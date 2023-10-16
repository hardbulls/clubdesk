export const newsOverviewAuthorSubheading = () => {
    const overviewSubheadings = document.querySelectorAll("div.cd-tile-v-main-subheading") as NodeListOf<HTMLElement>

    for (const overviewSubheading of Array.from(overviewSubheadings)) {
        if (overviewSubheading.childNodes[2]) {
            overviewSubheading.childNodes[2].textContent = overviewSubheading.childNodes[2].textContent?.trim() || ""
        }
    }
}

export const moveNewsSubheading = () => {
    const detailSection = document.querySelector("div.cd-news-detail div.cd-detailPageNavigation") as HTMLElement
    const detailSubheading = document.querySelector("div.cd-news-detail div.cd-additional-subheading") as HTMLElement

    if (detailSection && detailSubheading) {
        detailSection.style.display = "flex"
        detailSection.style.justifyContent = "space-between"

        detailSection.appendChild(detailSubheading)

        const childNode3 = detailSubheading.childNodes[2]

        // Remove ", " if author is empty
        if (childNode3 && childNode3.textContent?.trim() === ",") {
            detailSubheading.removeChild(childNode3)
        } else if (childNode3) {
            childNode3.textContent = childNode3.textContent?.trim() || ""
        }
    }
}
