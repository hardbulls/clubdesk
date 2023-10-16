import {DOMcreateElement} from "../jsx";
import {Positions} from "./Positions"
import {HitAndThrow} from "./HitAndThrow"

interface Props {
    name: string,
    positions: string[],
    hits?: string|undefined,
    throws?: string|undefined
}

export const PlayerCardContent = ({name, positions, hits, throws}: Props) => {
    return (
        <div className="hardbulls-player-card-content">
            <div className="hardbulls-player-card-name">
                {name}
            </div>
            <div>
                <Positions positions={positions}/>
                <HitAndThrow hitting={hits} throwing={throws}/>
            </div>
        </div>
    )
}
