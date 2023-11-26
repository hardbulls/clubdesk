import type { League } from "../model/League"
import LEAGUES from "../../config/leagues.json"

export class LeagueRepository {
    public static findAll(): League[] {
        return LEAGUES
    }

    public static findById(id: string): League {
        const league = LEAGUES.find((league) => (league.id = id))

        if (!league) {
            throw new Error(`League ${id} not found.`)
        }

        return league
    }
}
