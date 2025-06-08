import './game-card-component.css'
import {DOMcreateElement} from "../jsx";
import type {Game} from "../model/Game";
import {GoogleMapsLink} from "../GoogleMapsLink";
import {dateTimeFormatter} from "../util/date";
import {GAME_CANCELED, GAME_FORFEIT, GAME_SUSPENDED} from "../translations";
import {CooperationTeamLogoComponent} from "../team-logo-component/cooperation-team-logo-component";
import {TeamLogoComponent} from "../team-logo-component/team-logo-component";
import type {Field} from "../model/Field";
import {ASSETS_BASE_URL} from "../config";

interface Props {
    game: Game
}

function getFieldImage(field: Field): string | undefined {
    if (field.image) {
        return `${ASSETS_BASE_URL}fields/_resized/${field.image}_640x.webp`;
    }

    return;
}


export const GameCardComponent = ({game}: Props): JSX.Element => {
    const CN = "hb-game-card-component";
    const image = game.venue && getFieldImage(game.venue)

    const now = new Date()

    now.setHours(0)
    now.setMinutes(0)

    const isGrayedOut = game.status === 'canceled' || game.status === "forfeit" || game.status === "suspended";

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
                {
                    game.status === 'forfeit' ?
                        (
                            <div className={`${CN}-canceled`}>
                                <span>{`${game.awayScore} : ${game.homeScore} (${GAME_FORFEIT})`}</span>
                            </div>
                        ) : undefined
                }
                {
                    game.status === 'suspended' ?
                        (
                            <div className={`${CN}-canceled`}>
                                <span>{`${game.awayScore} : ${game.homeScore} (${GAME_SUSPENDED})`}</span>
                            </div>
                        ) : undefined
                }
            </div>

            <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                <strong>
                    {game.away?.name}
                </strong>
                <strong>
                    &nbsp;-&nbsp;
                </strong>
                <strong>
                    {game.home?.name}
                </strong>
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
