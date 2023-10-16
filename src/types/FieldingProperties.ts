import { CalculationType } from "./enum/CalculationType"
import type { StatisticProperty } from "./StatisticProperty"

export const FieldingProperties: StatisticProperty[] = [
    {
        abbreviation: "G",
        name: "Games Played",
        type: CalculationType.SUM,
        wiki: "https://en.wikipedia.org/wiki/Games_played",
    },
]
