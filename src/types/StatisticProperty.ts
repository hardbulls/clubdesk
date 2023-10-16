import type { CalculationType } from "./enum/CalculationType"

export interface StatisticProperty {
    abbreviation: string
    name: string
    type: CalculationType
    wiki: string
    alias?: string | undefined
    calculate?: (stats: { [key: string]: number }) => number | undefined
}
