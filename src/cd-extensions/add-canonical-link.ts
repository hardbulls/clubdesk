export const addCanonicalLink = () => {
    const tag = document.createElement("link")

    tag.setAttribute("rel", "canonical")

    if (window.location.href.startsWith(`${window.location.origin}/willkommen`)) {
        tag.href = window.location.href.replace(`${window.location.origin}/willkommen`, `${window.location.origin}/`)
    } else {
        tag.href = window.location.href
    }

    const urlParams = new URLSearchParams(window.location.search)
    const cParam = urlParams.get("c")

    if (cParam && !cParam.startsWith("NL")) {
        tag.href = tag.href.replace(`&c=${cParam}`, `&c=NL,${cParam}`)
    }

    if (!window.location.search.startsWith("?b=")) {
        tag.href = tag.href.replace(window.location.search, "")
    } else {
        const originalTitle = document.title
        const title = document.querySelector(".cd-section-content .cd-row h1")?.textContent

        if (title) {
            document.title = `${title.trim()} | ${originalTitle}`
        }
    }

    document.head.appendChild(tag)
}
