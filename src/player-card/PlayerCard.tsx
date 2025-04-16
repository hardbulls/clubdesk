import {DOMcreateElement} from "../jsx";
import "../player-card.css"
// @ts-ignore since typescript doesn't support multiple wildcards
import defaultPlayer from "../../config/images/players/default.png?as=webp&width=220&height=220"

import {CoachCardContent} from "./CoachCardContent"
import {PlayerCardContent} from "./PlayerCardContent"
import {CountryFlag} from "./CountryFlag"
import {loadFiles} from "../util/files"
import {Statistics} from "./Statistics"
import type {Modal} from "../create-modal";
import type {Player} from "../model/Player";
import {CooperationIcon} from "./CooparationIcon";
import {ImportIcon} from "./ImportIcon";
import {AwardsSection} from "./AwardSection";

const playerImageMapping = loadFiles(
    require.context("../../config/images/players/?as=webp&width=220&height=220", false, /\.(png|jpg)$/)
)
interface Props {
    player: Player,
    modal: Modal
}

export const PlayerCard = ({player, modal}: Props): JSX.Element => {
    const name = player.name
    const imageName = player.image || "default.png"
    // const playerImage = playerImageMapping[`./${imageName}`];
    // const image = playerImage || defaultPlayer
    const playerImage = undefined;
    const image = defaultPlayer

    return (
        <div className="hardbulls-player-card">
            <div className="hardbulls-player-card-image-container">
                <img className={`${player.image && playerImage ? 'has-image' : ''}`} src={image} alt={name} width={220} height={220}/>
            </div>
            {player.isCoach ?
                <CoachCardContent name={name}/> :
                <PlayerCardContent name={name} positions={player.positions} hits={player.hits} throws={player.throws}/>}
            <div className="hardbulls-player-card-top-left">
                {player.awards && <AwardsSection awards={player.awards}/> }
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
