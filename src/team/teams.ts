import teams from "../../config/teams.json"
import type { Team } from "../model/Team"

export const getTeams = (): Team[] => {
    return teams as Team[]
}

export const findTeam = (search: string): Team => {
    for (const team of getTeams()) {
        if (
            team.name.toLowerCase() === search.toLowerCase() ||
            team.keywords.some((v) => search.toLowerCase() === v.toLowerCase())
        ) {
            return team
        }
    }

    throw new Error(`Team ${search} not found`)
}
