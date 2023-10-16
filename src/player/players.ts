import playerData from "../../config/players.json"
import statsJson from "../assets/bulls_stats.json"
import type { PlayerData } from "../PlayerCardsContainer"
import type { PlayerMapping } from "../types/player-mapping"
import type { Player } from "../model/Player"
import { fetchApi } from "../api"
import { CURRENT_YEAR } from "../util/date"
import type { PlayerStats } from "../model/PlayerStats"

const playerDataByName: { [key: string]: PlayerData } = playerData.reduce(
    (result: { [key: string]: PlayerData }, player) => {
        result[player.name] = player

        return result
    },
    {}
)

const allStats = statsJson as PlayerMapping

const playerCache: { [key: string]: Player } = {}

export const getTotalPlayTimeValue = (player: Player): number => {
    return !player.stats
        ? 0
        : Object.values(player.stats).reduce((result, value) => {
              const ipStat =
                  value.pitching && value.pitching["IP"] ? Number.parseInt(value.pitching["IP"]?.toString()) : 0
              const paStat = value.batting && value.batting["PA"] ? Number.parseInt(value.batting["PA"]?.toString()) : 0

              return result + ipStat + paStat
          }, 0)
}

export const getPlayTimeValueForYear = (player: Player, year: number): number => {
    const value = player.stats?.[year]

    if (value) {
        const ipStat = value.pitching && value.pitching["IP"] ? Number.parseInt(value.pitching["IP"]?.toString()) : 0
        const paStat = value.batting && value.batting["PA"] ? Number.parseInt(value.batting["PA"]?.toString()) : 0

        return ipStat + paStat
    }

    return 0
}

let currentStats: PlayerStats | undefined

export const getPlayerWithStats = async (name: string): Promise<Player | undefined> => {
    const player = getPlayer(name)

    if (!player) {
        return
    }

    if (!currentStats) {
        currentStats = (await fetchApi("bbl_2023_stats.json")) as { [key: string]: PlayerStats }
    }

    const playerStats = player?.stats
    const playerData = playerDataByName[name]

    if (!playerData) {
        return
    }

    const currentPlayerStats: any = currentStats[name]

    if (currentPlayerStats) {
        if (currentPlayerStats[CURRENT_YEAR] && !currentPlayerStats?.[CURRENT_YEAR]?.batting?.["PA"]) {
            const yearValue = currentPlayerStats[CURRENT_YEAR]?.batting

            if (yearValue) {
                yearValue["PA"] =
                    Number.parseInt(currentPlayerStats?.[CURRENT_YEAR]?.batting?.["AB"]?.toString() || "0") +
                    Number.parseInt(currentPlayerStats?.[CURRENT_YEAR]?.batting?.["SF"]?.toString() || "0") +
                    Number.parseInt(currentPlayerStats?.[CURRENT_YEAR]?.batting?.["SH"]?.toString() || "0") +
                    Number.parseInt(currentPlayerStats?.[CURRENT_YEAR]?.batting?.["BB"]?.toString() || "0") +
                    Number.parseInt(currentPlayerStats?.[CURRENT_YEAR]?.batting?.["SF"]?.toString() || "0")
            }
        }

        player.stats = {
            ...(playerStats || {}),
            ...currentPlayerStats,
        }
    }

    return player
}

export const getPlayer = (name: string): Player | undefined => {
    if (playerCache[name]) {
        return playerCache[name]
    }

    const playerStats = allStats[name]
    const playerData = playerDataByName[name]

    if (!playerData) {
        return
    }

    const player: Player = {
        name: playerData.name,
        positions: playerData.positions,
        yearOfBirth: playerData.yearOfBirth,
        nickname: playerData.nickname,
        isCoach: playerData.isCoach,
        throws: playerData.throws,
        hits: playerData.hits,
        number: playerData.number,
        image: playerData.image,
        nationality: playerData.nationality,
        cooperationPlayer: playerData.cooperationPlayer,
        isImport: playerData.isImport,
        stats: playerStats,
        active: playerData.active,
    }

    playerCache[name] = player

    return player
}

export const getAllActivePlayers = (): Player[] => {
    const names = Object.keys(playerDataByName)
    const players: Player[] = []

    for (const name of names) {
        const player = getPlayer(name)

        if (player) {
            players.push(player)
        }
    }

    return players.filter((player) => player.active !== false)
}

export const getAllActivePlayersWithStats = async (): Promise<Player[]> => {
    const names = Object.keys(playerDataByName)
    const players: Player[] = []

    for (const name of names) {
        const player = await getPlayerWithStats(name)

        if (player) {
            players.push(player)
        }
    }

    return players.filter((player) => player.active !== false)
}
