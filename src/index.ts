import "./index.css"
import "./banner-video.css"
import "./cd-navigation.css"
import "./cd-news.css"
import "./cd-sponsors.css"
import "./cd-grid-reset.css"
import "./button.css"
import "./modal.css"
import "./table.css"
import "./icons.css"
import "./flags.css"
import "./font.css"
import { NextGame } from "./game-table/NextGame"
import { PlayerCardsContainer } from "./PlayerCardsContainer"
import { appendToElement } from "./util/html"
import { loadFiles } from "./util/files"
import { optimizeSponsorImages } from "./cd-extensions/optimize-sponsor-images"
import { alwaysShowMenuOnDesktop } from "./cd-extensions/always-show-menu-on-desktop"
import { addNameToHeader } from "./cd-extensions/add-name-to-header"
import { shuffleSponsors } from "./cd-extensions/shuffle-sponsors"
import { moveNewsSubheading, newsOverviewAuthorSubheading } from "./cd-extensions/news"
import { addImageFallback } from "./cd-extensions/add-image-fallback"
import { removeMenuText } from "./cd-extensions/remove-menu-text"
import { GamePlanTabs } from "./game-table/GamePlanTabs"
import { FieldSection } from "./field-section/FieldSection"
import { UpcomingGames } from "./game-table/UpcomingGames"
import leagues from "../config/leagues.json"
import { Standings } from "./standings/Standings"
import { notFoundGame } from "./cd-extensions/not-found-game"
import { Ballpark } from "./ballpark/Ballpark"
import { addCanonicalLink } from "./cd-extensions/add-canonical-link"
import { replaceLogoLink } from "./cd-extensions/replace-logo-link"

const bullLogos = loadFiles(require.context("./assets/bulls_logos/?as=webp&width=160&height=150", false, /\.(png|jpg)/))
const filteredLeagues = leagues.filter((league) => league.isActive)

const addBannerVideo = () => {
    if (window.location.host.includes("hardbulls.com")) {
        const container = document.querySelector(".cd-header:has(.hardbulls-hero-banner)") as HTMLElement

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
    const container = document.querySelector(".bulls-banner-logo") as HTMLImageElement

    if (container) {
        const date = new Date()
        const img = new Image()

        if (date.getMonth() === 3 && date.getDate() > 6 && date.getDate() < 11) {
            if (bullLogos["./easter_bull.png"]) {
                img.src = bullLogos["./easter_bull.png"]
            }
        if (date.getMonth() === 11) {
            if (bullLogos["./santa_bull.png"]) {
                img.src = bullLogos["./easter_bull.png"]
            }
        
        } else {
            if (bullLogos["./normal_bull_white.png"]) {
                img.src = bullLogos["./normal_bull_white.png"]
            }
        }

        container.appendChild(img)
    }
}

const applyTheme = () => {
    const getRecolorElements = () => {
        return [
            document.querySelectorAll(".cd-club-logo"),
            document.querySelectorAll(".hardbulls-hero-banner"),
            document.querySelectorAll("h1"),
            document.querySelectorAll(".hardbulls-team-logo"),
            document.querySelectorAll("a:not(:has(img))"),
            document.querySelectorAll(".cd-footer"),
            document.querySelectorAll("table"),
            document.querySelectorAll(".cd-totop-button"),
            document.querySelectorAll(".bulls-club-name"),
        ].filter(Boolean)
    }
    // const now = new Date()
    const now = new Date()

    const getMothersDay = () => {
        const mayFirst = new Date(now.getFullYear(), 4, 1)
        const dayOfWeek = mayFirst.getDay()

        let firstSunday
        if (dayOfWeek == 0) {
            firstSunday = mayFirst
        } else {
            firstSunday = new Date()
            firstSunday.setDate(1 + (7 - dayOfWeek))
        }

        return new Date(now.getFullYear(), 4, firstSunday.getDate() + 7)
    }

    const mothersDay = getMothersDay()
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
    replaceLogoLink()
    optimizeSponsorImages()
    alwaysShowMenuOnDesktop()
    addNameToHeader()
    shuffleSponsors()
    addImageFallback()
    moveNewsSubheading()

    appendToElement(".hardbulls-card-game-table", () => GamePlanTabs())
    appendToElement(".hardbulls-next-game", () => NextGame())
    appendToElement(".hardbulls-player-container", () => PlayerCardsContainer())
    appendToElement(".hardbulls-ballpark-info-container", () => FieldSection())
    appendToElement(".hardbulls-upcoming-games-container", () => UpcomingGames(filteredLeagues))
    appendToElement(".hardbulls-standings-container", () => Standings())
    appendToElement(".hardbulls-ballpark-container", () => Ballpark())

    newsOverviewAuthorSubheading()
    addBullsLogo()
    addBannerVideo()
    applyTheme()
    removeMenuText()
    iconsAfterButtons()
    notFoundGame()
}
