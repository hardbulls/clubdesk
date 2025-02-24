import teams from "../../config/teams.json"
import type { Team } from "../model/Team"

export const getTeams = (): Team[] => {
    return teams as Team[]
}

export const findTeam = (search: string): Team => {
    for (const team of getTeams()) {
        if (
            team.name.toLowerCase() === search.toLowerCase() ||
            team.keywords.some((v) => search.toLowerCase() === v.toLowerCase()) ||
            team.name.toLowerCase().includes(search.toLowerCase()) ||
            search.toLowerCase().includes(team.name.toLowerCase()) ||
            team.keywords.map((v) => v.toLowerCase()).includes(search.toLowerCase()) ||
            team.keywords.some((v) => search.toLowerCase().includes(v.toLowerCase()))
        ) {
            return team
        }
    }

    throw new Error(`Team ${search} not found`)
}
