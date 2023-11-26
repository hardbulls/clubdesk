import type { League } from "../model/League"
import { fetchV2Api } from "../api"
import type { Standing } from "../model/Standing"
import { findTeam } from "../team/teams"

type ApiStandings = {
    results: Array<{
        position: number
        team: string
        wins: number
        loses: number
        ties: number
        winsPercentage: number
        gamesBehind?: number
    }>
    type: "FINAL" | "GROUP_A" | "GROUP_B" | "GROUP_C" | "REGULAR" | "PLAYOFF" | "UNKNOWN"
}

export class StandingsRepository {
    public static async findByLeagueAndSeason(league: League, season: number): Promise<Standing[]> {
        return ((await fetchV2Api(`seasons/${season}/${league.id}/standings.json`)) as ApiStandings[]).map(
            (standings) => {
                return {
                    results: standings.results.map((result) => {
                        return {
                            ...result,
                            team: findTeam(result.team),
                        }
                    }),
                    type: standings.type,
                }
            }
        )
    }
}
