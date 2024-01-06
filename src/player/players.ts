import playerData from "../../config/players.json"
import type { PlayerData } from "../PlayerCardsContainer"
import type { Player } from "../model/Player"
import { StatisticsRepository } from "../repository/statistics-repository"
import type { PlayerStats } from "../model/PlayerStats"

const playerDataByName: { [key: string]: PlayerData } = playerData.reduce(
    (result: { [key: string]: PlayerData }, player) => {
        result[player.name] = player

        return result
    },
    {}
)

const playerCache: { [key: string]: Player } = {}

export const getTotalPlayTimeValue = (player: Player): number => {
    return !player.stats
        ? 0
        : Object.values(player.stats).reduce((result, value) => {
              const ipStat =
                  value.pitching && value.pitching["ip"] ? Number.parseInt(value.pitching["ip"]?.toString()) : 0
              const paStat = value.batting && value.batting["pa"] ? Number.parseInt(value.batting["pa"]?.toString()) : 0

              return result + ipStat + paStat
          }, 0)
}

export const getPlayTimeValueForYear = (player: Player, year: number): number => {
    const value = player.stats?.[year]

    if (value) {
        const ipStat = value.pitching && value.pitching["ip"] ? Number.parseInt(value.pitching["ip"]?.toString()) : 0
        const paStat = value.batting && value.batting["pa"] ? Number.parseInt(value.batting["pa"]?.toString()) : 0

        return ipStat + paStat
    }

    return 0
}

const enhanceStats = (playerStatistics: PlayerStats): PlayerStats => {
    for (const stats of Object.values(playerStatistics)) {
        if (stats.batting && stats.batting["g"] === undefined) {
            if (stats.fielding && stats.fielding["g"]) {
                stats.batting.g = stats.fielding["g"]
            }
        }

        if (stats.pitching && stats.pitching["g"] === undefined && stats.pitching["app"]) {
            stats.pitching["g"] = stats.pitching["app"]
        }

        if (stats.batting && stats.batting["pa"] === undefined) {
            stats.batting.pa =
                Number.parseInt(stats.batting?.["ab"]?.toString() || "0") +
                Number.parseInt(stats.batting?.["sf"]?.toString() || "0") +
                Number.parseInt(stats.batting?.["sh"]?.toString() || "0") +
                Number.parseInt(stats.batting?.["bb"]?.toString() || "0") +
                Number.parseInt(stats.batting?.["sf"]?.toString() || "0")
        }
    }

    return playerStatistics
}

export const getPlayerWithStats = async (name: string): Promise<Player | undefined> => {
    const player = await getPlayer(name)

    if (!player) {
        return
    }

    const playerStats = player?.stats
    const playerData = playerDataByName[name]

    if (!playerData) {
        return
    }

    player.stats = playerStats ? enhanceStats(playerStats) : {}

    return player
}

const getPlayer = async (name: string): Promise<Player | undefined> => {
    if (playerCache[name]) {
        return playerCache[name]
    }

    const playerStats = await StatisticsRepository.findByLeagueAndActivePlayerName("bbl", name)
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
