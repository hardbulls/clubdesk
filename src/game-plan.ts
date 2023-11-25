import csvGamePlan from "./assets/all_2023.json"
import { parseDate, sortByDate } from "./util/date"

export interface CsvEntry {
    Heim: string
    Gast: string
    Startzeit: string
    Altersklasse: string
    Datum: string
    Spielort: string
    isCanceled?: boolean
    isContinuation?: boolean
    isDelayed?: boolean
    movedTo?: string
}

export interface Game {
    home: string
    away: string
    start: Date[]
    venue: string
    isCanceled: boolean
    isDelayed: boolean
    isContinuation: boolean
    movedTo?: Date | undefined
}

export const getGamesForTeam = (
    teams: string[],
    leagues: string[],
    futureOnly = false,
    excludeCanceled = false,
    untilDate?: Date
): Game[] => {
    let csvEntries = csvGamePlan
        .filter((entry) => entry["Startzeit"]?.trim() !== "noch offen")
        .filter((entry) => entry["Altersklasse"]?.trim() !== "")
        .filter((entry) => entry["Heim"] && entry["Heim"].trim() !== "")
        .filter((entry) => entry["Gast"] && entry["Gast"].trim() !== "")
        .filter((entry) => entry["Altersklasse"] && leagues.includes(entry["Altersklasse"].trim()))
        .filter((entry) => entry["Datum"]?.trim() !== "" && entry["Startzeit"])
        .filter(
            (entry) => teams.some((v) => entry["Heim"]?.includes(v)) || teams.some((v) => entry["Gast"]?.includes(v))
        ) as CsvEntry[]

    if (futureOnly) {
        const now = new Date()

        now.setHours(0)
        now.setMinutes(0)

        csvEntries = csvEntries.filter((entry) => {
            const startDate = parseDate(`${entry["Datum"]} ${entry["Startzeit"]}`)

            return startDate > now
        })
    }

    if (untilDate) {
        csvEntries = csvEntries.filter((entry) => {
            const startDate = parseDate(`${entry["Datum"]} ${entry["Startzeit"]}`)

            return startDate < untilDate
        })
    }

    if (excludeCanceled) {
        csvEntries = csvEntries.filter((entry) => {
            return !entry.isCanceled && !entry.isDelayed
        })
    }

    const mergedGames: Game[] = []

    const findExistingGame = (game: CsvEntry): Game | undefined => {
        for (const mergedGame of mergedGames) {
            const date = parseDate(`${game.Datum} ${game.Startzeit}`)
            const mergedGameDate = mergedGame.start[0] || new Date()

            if (game.isContinuation || game.isDelayed || game.isContinuation) {
                return
            }

            if (
                mergedGame.home === game.Heim &&
                mergedGame.away === game.Gast &&
                mergedGameDate.getFullYear() === date.getFullYear() &&
                mergedGameDate.getMonth() === date.getMonth() &&
                mergedGameDate.getDate() === date.getDate() &&
                mergedGame.venue === game.Spielort &&
                !(mergedGame.isCanceled || mergedGame.isDelayed || mergedGame.isContinuation)
            ) {
                return mergedGame
            }
        }

        return
    }

    for (const csvEntry of csvEntries) {
        const existingGame = findExistingGame(csvEntry)

        if (existingGame) {
            existingGame.start.push(parseDate(`${csvEntry.Datum} ${csvEntry.Startzeit}`))

            existingGame.start.sort(sortByDate)
        } else {
            mergedGames.push({
                home: csvEntry.Heim,
                away: csvEntry.Gast,
                start: [parseDate(`${csvEntry.Datum} ${csvEntry.Startzeit}`)],
                venue: csvEntry.Spielort,
                isCanceled: csvEntry.isCanceled || false,
                isContinuation: csvEntry.isContinuation || false,
                isDelayed: csvEntry.isDelayed || false,
                movedTo: csvEntry.movedTo ? parseDate(csvEntry.movedTo) : undefined,
            })
        }
    }

    return mergedGames.sort((a, b) => {
        const startA = a.start[0]
        const startB = b.start[0]

        if (startA && startB && startA.getTime() > startB.getTime()) {
            return 1
        }

        if (startA && startB && startA.getTime() < startB.getTime()) {
            return -1
        }

        return 0
    })
}
