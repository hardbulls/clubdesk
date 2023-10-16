export const addNameToHeader = () => {
    const siteNameElement = document.createElement("span")

    siteNameElement.classList.add("bulls-club-name", "bulls-script")
    siteNameElement.textContent = "Hard Bulls Baseballverein"

    document.querySelector("div.cd-club-logo-and-name")?.appendChild(siteNameElement)
}
