import './game-card.css'
import {DOMcreateElement} from "../jsx";
import type { Game} from "../game-plan"
import {dateFormatterShort} from "../util/date"
import {GoogleMapsLink} from "../GoogleMapsLink"
import {loadFiles} from "../util/files";
import {findField} from "../fields";
import {findTeam} from "../team/teams";
import {formatGameTime} from "./format-game-time";
import {CooperationLogo} from "./CoorperationLogo";
import {TeamLogo} from "./TeamLogo";

const fieldImageMapping = loadFiles(
    require.context("../../config/images/fields/?as=webp&width=260&height=200", false, /\.(png|jpg)$/)
)

interface Props {
    entry: Game
}

const CanceledOverlay = ({game}: {game: Game}) => {
    const isMoved = game.isCanceled && game.movedTo;

    if (game.isCanceled) {
        return (
            <div className="hardbulls-game-card-overlay">
                <div className="canceled-text">{isMoved ? 'Verschoben' : 'Abgesagt'}</div>
                {isMoved && <div className="moved-date">auf {dateFormatterShort.format(game.movedTo)}</div>}
            </div>
        )
    }

    if (game.isDelayed) {
        return (
            <div className="hardbulls-game-card-overlay">
                <div className="delayed-text">{'Abgebrochen'}</div>
                {game.movedTo && <div className="continuation-date">Fortsetzung am {dateFormatterShort.format(game.movedTo)}</div>}
            </div>
        )
    }

    if (game.isContinuation) {
        return (
            <div className="hardbulls-game-card-overlay">
                <div className="continuation-text">Fortsetzung</div>
            </div>
        )
    }

    return null;
}

export const GameCard = ({ entry }: Props): JSX.Element => {
    const homeTeam = findTeam(entry.home);
    const awayTeam = findTeam(entry.away);
    const startDate = entry.start[0];

    const venue = entry.venue;
    const field = findField(homeTeam.name, venue);

    const awayClass = field.location !== "Hard" ? "hardbulls-game-card-away" : "";

    const image = fieldImageMapping[`./${field?.image}`];

    const now = new Date()

    now.setHours(0)
    now.setMinutes(0)

    const isGrayedOut = (startDate && startDate < now) || entry.isCanceled || entry.isDelayed;
    const isCanceled = entry.isCanceled

    return (
        <div className={`hardbulls-game-card-container ${awayClass} `}>
            <div className={`${isGrayedOut && 'past-game'}`} style={{
                backgroundImage: image && `url(${image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}>
                <div className="hardbulls-game-card-header-container">
                    {
                        homeTeam.isCooperation ? <CooperationLogo team={homeTeam}/> : <TeamLogo team={homeTeam}/>
                    }
                    <div style={{fontSize: '32px', marginTop: 'auto', marginBottom: 'auto', marginLeft: '10px', marginRight: '10px'}}>
                        -
                    </div>
                    {
                        awayTeam.isCooperation ? <CooperationLogo team={awayTeam}/> : <TeamLogo team={awayTeam}/>
                    }
                </div>
            </div>
            <CanceledOverlay game={entry}/>
            <div className="hardbulls-game-card-row">
                <strong>{entry.home}</strong>&nbsp;-&nbsp;<strong>{entry.away}</strong>
            </div>
            <div className={`hardbulls-game-card-row ${isCanceled ? 'hardbulls-game-card-canceled-text' : ''}`} >
                {entry.start.map(formatGameTime).join('')
                }
            </div>
            <div className="hardbulls-game-card-row">
                {field ?
                <GoogleMapsLink venue={field.venue ? `${field.venue}, ${field.location}` : `${field.location}`}/> :
                <GoogleMapsLink venue={entry.venue}/>
                }
            </div>
        </div>
    )
}
