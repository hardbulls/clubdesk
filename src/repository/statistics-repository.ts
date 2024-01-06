import { fetchV2Api } from "../api"
import type { PitchingAbbreviations } from "../model/PitchingAbbreviations"
import type { BattingAbbreviations } from "../model/BattingAbbreviations"
import type { PlayerStats } from "../model/PlayerStats"

type ApiStatistics = {
    [key: string]: {
        [key: number]: {
            pitching: PitchingAbbreviations
            batting: BattingAbbreviations
        }
    }
}

export class StatisticsRepository {
    public static async findByLeagueAndActivePlayerName(
        leagueId: string,
        playerName: string
    ): Promise<PlayerStats | undefined> {
        const statistics = (await fetchV2Api(`statistics/${leagueId}/all.json`)) as ApiStatistics
        return statistics[playerName]
    }
}
