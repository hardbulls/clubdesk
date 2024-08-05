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
        return ((await fetchV2Api(`seasons/${season}/${league.id}/games.json`)) as ApiGame[]).map((game) => {
            return {
                season: season,
                league: league,
                home: findTeam(game.home),
                away: findTeam(game.away),
                date: new Date(game.date),
                awayScore: game.awayScore,
                homeScore: game.homeScore,
                status: game.status,
                venue: findField(game.venue),
            }
        })
    }

    public static async findWeeklyGames(): Promise<Game[]> {
        return ((await fetchV2Api(`weekly-games.json`)) as ApiGame[]).map((game) => {
            return {
                season: game.season,
                league: LeagueRepository.findById(game.league),
                home: findTeam(game.home),
                away: findTeam(game.away),
                date: new Date(game.date),
                awayScore: game.awayScore,
                homeScore: game.homeScore,
                status: game.status,
                venue: findField(game.venue),
            }
        })
    }
}
