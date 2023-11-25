import type {Team} from "./Team";
import type {Field} from "./Field";

export type Game = {
    home?: Team,
    away?: Team,
    venue: Field|undefined
    homeScore: number,
    awayScore: number,
    status: 'finished'|'canceled'|'scheduled',
    date: Date
}
