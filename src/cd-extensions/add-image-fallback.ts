export const addImageFallback = () => {
    const newsImages = document.querySelectorAll(".cd-tile-v-box .cd-image-content")
    const notFoundImage = document.createElement("img")

    notFoundImage.src = "./wwwfiles/bull_gray.png?v={{lastWwwFilesChange}}"
    notFoundImage.style.width = "initial"
    notFoundImage.style.height = "initial"

    for (let i = 0; i < newsImages.length; i++) {
        const node = newsImages[i] as HTMLElement

        if (node && !node.querySelector("img")) {
            node.appendChild(notFoundImage)

            node.style.display = "flex"
            node.style.justifyContent = "center"
            node.style.alignItems = "center"

            node.style.border = "3px dashed #cccccc"
        }
    }
}
