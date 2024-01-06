import type { League } from "../model/League"
import LEAGUES from "../../config/leagues.json"
import { NotFoundError } from "../exception/not-found-error"

export class LeagueRepository {
    public static findAll(): League[] {
        return LEAGUES.filter((league) => league.isActive)
    }

    public static findById(id: string): League {
        const league = this.findAll().find((league) => (league.id = id))

        if (!league) {
            throw new NotFoundError("League", id)
        }

        return league
    }
}
