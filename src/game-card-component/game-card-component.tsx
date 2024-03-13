import './game-card-component.css'
import {DOMcreateElement} from "../jsx";
import {loadFiles} from "../util/files";
import type {Game} from "../model/Game";
import {GoogleMapsLink} from "../GoogleMapsLink";
import {dateTimeFormatter} from "../util/date";
import {GAME_CANCELED} from "../translations";
import {CooperationTeamLogoComponent} from "../team-logo-component/cooperation-team-logo-component";
import {TeamLogoComponent} from "../team-logo-component/team-logo-component";

const fieldImageMapping = loadFiles(
    require.context("../../config/images/fields/?as=webp&width=260&height=200", false, /\.(png|jpg)$/)
)

interface Props {
    game: Game
}


export const GameCardComponent = ({game}: Props): JSX.Element => {
    const CN = "hb-game-card-component";
    const image = game.venue?.image ? fieldImageMapping[`./${game.venue.image}`] : fieldImageMapping[`./unknown.png`];

    const now = new Date()

    now.setHours(0)
    now.setMinutes(0)

    const isGrayedOut = game.status === 'canceled';

    return (
        <div className={`${CN}`}>
            <div className={`${CN}-header ${isGrayedOut && `${CN}-grayed`}`} style={{
                backgroundImage: image && `url(${image})`,
            }}>
                <div className={`${CN}-header-logos`}>
                    {
                        game.away ? (game.away.isCooperation ? <CooperationTeamLogoComponent team={game.away}/> :
                            <TeamLogoComponent team={game.away}/>) : '?'
                    }
                    <div style={{
                        fontSize: '32px',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginLeft: '10px',
                        marginRight: '10px'
                    }}>
                        -
                    </div>
                    {
                        game.home ? (game.home.isCooperation ? <CooperationTeamLogoComponent team={game.home}/> :
                            <TeamLogoComponent team={game.home}/>) : '?'
                    }
                </div>
            </div>

            <div className={`${CN}-overlay-wrapper`}>
                {
                    game.status === 'finished' ?
                        (
                            <div className={`${CN}-score`}>
                                {`${game.awayScore} : ${game.homeScore}`}
                            </div>
                        ) : undefined
                }
                {
                    game.status === 'canceled' ?
                        (
                            <div className={`${CN}-canceled`}>
                                <span>{`${GAME_CANCELED}`}</span>
                            </div>
                        ) : undefined
                }
            </div>

            <div className={`${CN}-date ${game.status === 'canceled' ? `${CN}-date-canceled` : ''}`}>
                {dateTimeFormatter.format(game.date)}
            </div>
            {game.venue ?
                <div className={`${CN}-location`}>
                    <GoogleMapsLink
                        venue={game.venue.venue ? `${game.venue.venue}, ${game.venue.location}` : `${game.venue.location}`}/>
                </div> : <div className={`${CN}-location`}>&nbsp;</div>
            }
        </div>
    )
}
