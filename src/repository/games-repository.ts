import type { League } from "../model/League"
import { fetchV2Api } from "../api"
import { findTeam } from "../team/teams"
import { findField } from "../fields"
import type { Game } from "../model/Game"
import { LeagueRepository } from "./league-repository"

type ApiGame = {
    season: number
    league: string
    venue: string
    home: string
    away: string
    homeScore: number
    awayScore: number
    status: "finished" | "canceled" | "scheduled" | "forfeit" | "suspended"
    date: string
}

export class GamesRepository {
    public static async findByLeagueAndSeason(league: League, season: number): Promise<Game[]> {
        const result: Game[] = []

        for (const apiGame of (await fetchV2Api(`seasons/${season}/${league.id}/games.json`)) as ApiGame[]) {
            result.push({
                season: apiGame.season,
                league: LeagueRepository.findById(apiGame.league),
                home: findTeam(apiGame.home),
                away: findTeam(apiGame.away),
                date: new Date(apiGame.date),
                awayScore: apiGame.awayScore,
                homeScore: apiGame.homeScore,
                status: apiGame.status,
                venue: await findField(apiGame.venue),
            })
        }

        return result
    }

    public static async findWeeklyGames(): Promise<Game[]> {
        const result: Game[] = []

        for (const apiGame of (await fetchV2Api(`weekly-games.json`)) as ApiGame[]) {
            result.push({
                season: apiGame.season,
                league: LeagueRepository.findById(apiGame.league),
                home: findTeam(apiGame.home),
                away: findTeam(apiGame.away),
                date: new Date(apiGame.date),
                awayScore: apiGame.awayScore,
                homeScore: apiGame.homeScore,
                status: apiGame.status,
                venue: await findField(apiGame.venue),
            })
        }

        return result
    }
}
