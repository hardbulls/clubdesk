import type { PitchingAbbreviations } from "./PitchingAbbreviations"
import type { BattingAbbreviations } from "./BattingAbbreviations"
import type { FieldingAbbreviations } from "./FieldingAbbreviations"

export interface PlayerStats {
    [key: string]: {
        pitching?: PitchingAbbreviations
        batting?: BattingAbbreviations
        fielding?: FieldingAbbreviations
    }
}
