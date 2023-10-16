export const replaceLogoLink = () => {
    const logo = document.querySelector<HTMLLinkElement>("a.cd-club-logo-link")

    if (logo) {
        logo.href = `${window.location.origin}/`
    }
}
