import type { PlayerStats } from "./PlayerStats"
import type { Award } from "./Award"

export interface Player {
    name: string
    positions: string[]
    yearOfBirth?: number | null | undefined
    nickname?: string | undefined
    isCoach?: boolean | undefined
    throws?: string | undefined
    hits?: string | undefined
    number?: number | undefined
    image?: string | undefined
    nationality?: string | undefined
    isImport?: boolean | undefined
    cooperationPlayer?: string | undefined
    stats?: PlayerStats | undefined
    active?: boolean | undefined
    awards?: Award[]
}
