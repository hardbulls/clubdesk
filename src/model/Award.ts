import type { League } from "./League"

export type Award = {
    type:
        | "all_star"
        | "gold_glove"
        | "best_pitcher"
        | "2_pitcher"
        | "3_pitcher"
        | "best_batter"
        | "2_batter"
        | "3_batter"
        | "mvp"
        | "coach_of_the_year"
    season: number
    league: League
    title: string
}
