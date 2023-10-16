import {DOMcreateElement} from "../jsx";
import {getGamesForTeam} from "../game-plan"
import {GameCard} from "./GameCard"

interface Props {
    teams: string[]
    league: string
}

export const GameCardContainer = ({teams, league}: Props) => {
    const games = getGamesForTeam(teams, [league]);

    return (
        <div className="hardbulls-game-overview-container">
            {
                games.map(game => <GameCard entry={game}/>)
            }
        </div>
    )
}
