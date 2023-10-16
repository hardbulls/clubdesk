export const shuffleSponsors = () => {
    const sponsorItem = document.querySelector(".cd-sponsors-item") as HTMLElement
    const sponsorContainer = sponsorItem && (sponsorItem.parentElement as HTMLElement)

    if (sponsorContainer) {
        for (let i = sponsorContainer.children.length; i >= 0; i--) {
            const child = sponsorContainer.children[(Math.random() * i) | 0]

            if (child) {
                sponsorContainer.appendChild(child)
            }
        }
    }
}
