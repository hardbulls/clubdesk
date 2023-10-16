import {DOMcreateElement} from "./jsx";
import {createModal} from "./create-modal"
import {Statistics} from "./statistics/Statistics"
import {PlayerCard} from "./player-card/PlayerCard"
import {replaceElementChildren} from "./util/html";
import {
    getAllActivePlayersWithStats,
    getPlayerWithStats, getPlayTimeValueForYear,
    getTotalPlayTimeValue
} from "./player/players";
import type {Player} from "./model/Player";
import {CURRENT_YEAR} from "./util/date";

export interface PlayerData {
    name: string
    positions: string[]
    yearOfBirth?: number | null
    nickname?: string
    isCoach?: boolean
    throws?: string
    hits?: string
    number?: number
    image?: string
    isImport?: boolean
    cooperationPlayer?: string
    nationality?: string
    active?: boolean
}

const sortPlayers = (a: Player, b: Player) => {
    if (a.isCoach && !b.isCoach) {
        return -1
    }

    if (!a.isCoach && b.isCoach) {
        return 1
    }


    if (getPlayTimeValueForYear(a, CURRENT_YEAR) > getPlayTimeValueForYear(b, CURRENT_YEAR)) {
        return -1;
    }

    if (getPlayTimeValueForYear(b, CURRENT_YEAR) > getPlayTimeValueForYear(a, CURRENT_YEAR)) {
        return 1;
    }

    if (getTotalPlayTimeValue(a) > getTotalPlayTimeValue(b)) {
        return -1;
    }

    if (getTotalPlayTimeValue(b) > getTotalPlayTimeValue(a)) {
        return 1;
    }

    if (a.image && !b.image) {
        return -1;
    }

    if (!a.image && b.image) {
        return 1;
    }

    return Math.random() < 0.5 ? 1 : -1
}

export const PlayerCardsContainer = (): JSX.Element => {
    (async () => {
        const container = document.querySelector('.hardbulls-player-container') as HTMLElement;

        if (!container) {
            return;
        }

        const modal = createModal({
            onOpen: (async (container, openTrigger) => {
                const playerName = openTrigger.getAttribute("data-player")

                if (!playerName) {
                    return
                }

                const player = await getPlayerWithStats(playerName);

                if (!player) {
                    return;
                }

                const playerStatsTable = <Statistics player={player}/>

                if (!playerStatsTable) {
                    return
                }

                replaceElementChildren(container, playerStatsTable);
            })
        })

        const children = (await getAllActivePlayersWithStats())
            .sort(sortPlayers)
            .map((player) => <PlayerCard player={player} modal={modal}/>);

        replaceElementChildren(container, [...children, modal.container])
    })()

    return (<div></div>)
}
