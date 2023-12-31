export const redirectAlternatePage = () => {
    if (window.location.pathname.startsWith("/willkommen")) {
        const location = window.location.href.replace(
            `${window.location.origin}/willkommen`,
            window.location.origin + "/"
        )

        window.location.replace(location)
    }
}
