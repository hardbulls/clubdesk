import type { Team } from "./Team"

export interface LeagueStandings {
    place: number
    team: Team
    wins: number
    losses: number
    ties: number
    percentile: number
    gamesBehind: number
}
