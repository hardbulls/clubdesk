export const optimizeSponsorImages = () => {
    const format = "_512x512"
    const sponsorImageTags = document.querySelectorAll("div.cd-sponsors-item .cd-image-content img")

    for (const image of Array.from(sponsorImageTags)) {
        if (image instanceof HTMLImageElement) {
            image.src = `${image.src}&imageFormat=${format}`
        }
    }
}
