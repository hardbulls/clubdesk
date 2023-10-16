import {DOMcreateElement} from "../jsx";
import {getGamesForTeam} from "../game-plan"
import { GameCard } from "./GameCard"
import {BULLS_TEAMS} from "../team/teams";

export const NextGame = (): JSX.Element => {
    const nextGameEntry = getGamesForTeam(BULLS_TEAMS, ["BBL", "BBL/NL Postseason"], true)[0] || null

    if (!nextGameEntry) {
        return <div/>
    }

    return <GameCard entry={nextGameEntry}/>
}
