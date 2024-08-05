import type { Team } from "./Team"
import type { Field } from "./Field"
import type { League } from "./League"

export type Game = {
    season: number
    league: League
    home?: Team
    away?: Team
    venue: Field | undefined
    homeScore: number
    awayScore: number
    status: "finished" | "canceled" | "scheduled" | "forfeit"
    date: Date
}
