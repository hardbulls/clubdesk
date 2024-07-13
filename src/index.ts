import "./index.css"
import "./banner-video.css"
import "./cd-navigation.css"
import "./cd-news.css"
import "./cd-sponsors.css"
import "./cd-grid-reset.css"
import "./button.css"
import "./modal.css"
import "./table.css"
import "./flags.css"
import "./font.css"
import "./Glyphter.css"
import { PlayerCardsContainer } from "./PlayerCardsContainer"
import { appendToElement } from "./util/html"
import { loadFiles } from "./util/files"
import { alwaysShowMenuOnDesktop } from "./cd-extensions/always-show-menu-on-desktop"
import { shuffleSponsors } from "./cd-extensions/shuffle-sponsors"
import { moveNewsSubheading, newsOverviewAuthorSubheading, replaceAlternateLinks } from "./cd-extensions/news"
import { addImageFallback } from "./cd-extensions/add-image-fallback"
import { removeMenuText } from "./cd-extensions/remove-menu-text"
import { FieldSection } from "./field-section/FieldSection"
import { notFoundGame } from "./cd-extensions/not-found-game"
import { Ballpark } from "./ballpark/Ballpark"
import { addCanonicalLink } from "./cd-extensions/add-canonical-link"
import { replaceLogoLink } from "./cd-extensions/replace-logo-link"
import { LeagueContainerComponent } from "./league-container-component/league-container-component"
import { UpcomingGamesComponent } from "./upcoming-games-component/upcoming-games-component"
import { redirectAlternatePage } from "./cd-extensions/redirect-alternate-page"
import { getMothersDay, isEasterSunday, yesterday } from "./util/date"

import "./components"

const bullLogos = loadFiles(
    require.context("./assets/bulls_logos/?as=webp&width=160&height=150", false, /\.(png|jpg|svg)/)
)

const addBannerVideo = () => {
    if (window.location.host.includes("hardbulls.com")) {
        const container = document.querySelector(".cd-header") as HTMLElement

        if (container) {
            const heroBanner = document.querySelector(".hardbulls-hero-banner") as HTMLElement
            const video = document.querySelector("#hardbulls-banner-video") as HTMLVideoElement

            if (video) {
                video.play()

                video.addEventListener(
                    "ended",
                    () => {
                        video.currentTime = 0
                        video.play()
                    },
                    false
                )
            }

            if (heroBanner) {
                container.replaceChildren(heroBanner)
                video.style.display = "block"
            }
        }
    }
}

const addBullsLogo = () => {
    if (!isRootPage()) {
        return
    }

    const container = document.querySelector(".bulls-banner-logo") as HTMLImageElement

    if (container) {
        const date = new Date()
        const img = new Image()
        const stPatricksDay = new Date(date.getFullYear(), 2, 17)

        if (isEasterSunday(date) || isEasterSunday(yesterday())) {
            if (bullLogos["./easter_bull.png"]) {
                img.src = bullLogos["./easter_bull.png"]
            }
        } else if (date.getMonth() === 11 && date.getDate() < 29) {
            if (bullLogos["./santa_bull.svg"]) {
                img.src = bullLogos["./santa_bull.svg"]
                img.style.filter = "drop-shadow(0 2px 3px #fff)"
            }
        } else if (date.getDate() === stPatricksDay.getDate() && date.getMonth() === stPatricksDay.getMonth()) {
            if (bullLogos["./st_patrick_bull.svg"]) {
                img.src = bullLogos["./st_patrick_bull.svg"]
            }
        } else {
            if (bullLogos["./normal_bull.png"]) {
                img.src = bullLogos["./normal_bull.png"]
            }
        }

        img.width = 160
        img.height = 150

        container.appendChild(img)
    }
}

const isRootPage = () => {
    return window.location.pathname === "/" && window.location.search === ""
}

const applyTheme = () => {
    if (!isRootPage()) {
        return
    }

    const getRecolorElements = () => {
        return [
            document.querySelectorAll(".cd-club-logo"),
            document.querySelectorAll("#hardbulls-banner-video"),
            document.querySelectorAll("h1"),
            document.querySelectorAll(".hardbulls-team-logo"),
            document.querySelectorAll("a:not(:has(img, span))"),
            document.querySelectorAll(".cd-backgroundPane"),
            document.querySelectorAll("#section_1000000"),
            document.querySelectorAll("table"),
            document.querySelectorAll(".cd-totop-button"),
            document.querySelectorAll(".bulls-club-name"),
            document.querySelectorAll(".cd-tile-v-main-heading"),
        ].filter(Boolean)
    }
    const now = new Date()

    const mothersDay = getMothersDay(now)
    const stPatricksDay = new Date(now.getFullYear(), 2, 17)

    if (
        now.getDate() === mothersDay.getDate() &&
        now.getFullYear() === mothersDay.getFullYear() &&
        now.getMonth() === mothersDay.getMonth()
    ) {
        for (const elements of getRecolorElements()) {
            for (const element of elements) {
                const htmlElement = element as HTMLElement

                htmlElement.style.filter = "hue-rotate(329deg) brightness(1.1)"
            }
        }
    } else if (now.getDate() === stPatricksDay.getDate() && now.getMonth() === stPatricksDay.getMonth()) {
        for (const elements of getRecolorElements()) {
            for (const element of elements) {
                const htmlElement = element as HTMLElement

                htmlElement.style.filter = "hue-rotate(120deg)"
            }
        }
    }
}

const iconsAfterButtons = () => {
    const buttons = document.querySelectorAll(".cd-button.cd-button-tertiary")

    for (const button of buttons) {
        if (button.textContent?.trim() === "Weitere Einträge") {
            const span = document.createElement("span")

            span.style.marginLeft = "4px"
            span.textContent = ">"

            button.append(span)
        } else if (button.textContent?.trim() === "Zurück") {
            const span = document.createElement("span")

            span.style.marginRight = "4px"
            span.textContent = "<"

            button.prepend(span)
        }
    }
}

export const theBulls = () => {
    addCanonicalLink()
    redirectAlternatePage()
    replaceAlternateLinks()
    replaceLogoLink()
    alwaysShowMenuOnDesktop()
    shuffleSponsors()
    addImageFallback()
    moveNewsSubheading()

    appendToElement(".hardbulls-player-container", () => PlayerCardsContainer())
    appendToElement(".hardbulls-ballpark-info-container", () => FieldSection())
    appendToElement(".hardbulls-upcoming-games-container", () => UpcomingGamesComponent())
    appendToElement(".hardbulls-league-container", () => LeagueContainerComponent())
    appendToElement(".hardbulls-ballpark-container", () => Ballpark())

    newsOverviewAuthorSubheading()
    addBullsLogo()
    addBannerVideo()
    applyTheme()
    removeMenuText()
    iconsAfterButtons()
    notFoundGame()
}
