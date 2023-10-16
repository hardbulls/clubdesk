import ical from "ical-generator"
import path from "path"
import { getVtimezoneComponent } from "@touch4it/ical-timezones"
import { getGamesForTeam } from "../src/game-plan"
import leagues from "../config/leagues.json"
import { findField } from "../src/fields"
import { BULLS_TEAMS, findTeam } from "../src/team/teams"

function changeTimezone(date: Date, ianatz: string) {
    const invdate = new Date(
        date.toLocaleString("en-US", {
            timeZone: ianatz,
        })
    )

    const diff = date.getTime() - invdate.getTime()

    return new Date(date.getTime() - diff)
}

for (const league of leagues) {
    const calendar = ical({ name: `${league.fullName} 2023` })

    calendar.timezone({
        name: "Europe/Vienna",
        generator: getVtimezoneComponent,
    })

    const games = getGamesForTeam(BULLS_TEAMS, [league.name], false, true)

    for (const game of games) {
        for (const start of game.start) {
            const end = new Date()

            end.setTime(start.getTime() + 2 * 60 * 60 * 1000)

            const homeTeam = findTeam(game.home)
            const field = findField(homeTeam.name, game.venue)
            const location = field.venue ? `${field.venue}, ${field.location}` : field.location
            const description = `${game.home} - ${game.away}`
            const summary = description

            calendar.createEvent({
                start: changeTimezone(start, "UTC"),
                end: changeTimezone(end, "UTC"),
                summary,
                description,
                location,
                timezone: "Europe/Vienna",
            })
        }
    }

    calendar.saveSync(path.join(__dirname, `../dist/${league.id}_2023.ics`))
}
