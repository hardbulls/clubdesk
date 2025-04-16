import {DOMcreateElement} from "../jsx";
import "../player-card.css"
import {CoachCardContent} from "./CoachCardContent"
import {PlayerCardContent} from "./PlayerCardContent"
import {CountryFlag} from "./CountryFlag"
import {Statistics} from "./Statistics"
import type {Modal} from "../create-modal";
import type {Player} from "../model/Player";
import {CooperationIcon} from "./CooparationIcon";
import {ImportIcon} from "./ImportIcon";
import {AwardsSection} from "./AwardSection";
import {ASSETS_BASE_URL} from "../config";

interface Props {
    player: Player,
    modal: Modal
}

export const PlayerCard = ({player, modal}: Props): JSX.Element => {
    const name = player.name
    const imageName = player.image || "default.png"
    const playerImage = `${ASSETS_BASE_URL}players/${imageName}`;

    return (
        <div className="hardbulls-player-card">
            <div className="hardbulls-player-card-image-container">
                <img className={`${player.image && playerImage ? 'has-image' : ''}`} src={playerImage} alt={name} width={200}/>
            </div>
            {player.isCoach ?
                <CoachCardContent name={name}/> :
                <PlayerCardContent name={name} positions={player.positions} hits={player.hits} throws={player.throws}/>}
            <div className="hardbulls-player-card-top-left">
                {player.awards && <AwardsSection awards={player.awards}/>}
            </div>
            <div className="hardbulls-player-card-icons">
                {player.isImport && <ImportIcon/>}
                {player.cooperationPlayer && <CooperationIcon value={player.cooperationPlayer}/>}
                {!player.isCoach && <Statistics name={name} modal={modal}/>}
            </div>
            <div className="hardbulls-player-card-footer">
                {player.nationality && <CountryFlag code={player.nationality}/>}
                {player.number && <div className="hardbulls-player-card-number">{player.number}</div>}
            </div>
        </div>
    )
}
