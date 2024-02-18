import type { League } from "./League"

export enum AwardType {
    "all_star" = "all_star",
    "gold_glove" = "gold_glove",
    "best_pitcher" = "best_pitcher",
    "2_pitcher" = "2_pitcher",
    "3_pitcher" = "3_pitcher",
    "best_batter" = "best_batter",
    "2_batter" = "2_batter",
    "3_batter" = "3_batter",
    "mvp" = "mvp",
    "coach_of_the_year" = "coach_of_the_year",
}

export type Award = {
    type: AwardType
    season: number
    league: League
    title: string
}
