import {DOMcreateElement} from "../jsx";
import './upcoming-games.css'
import type {League} from "../model/League";
import {getGamesForTeam} from "../game-plan";
import {BULLS_TEAMS, findTeam} from "../team/teams";
import {formatGameTime, formatGameTimeShort} from "./format-game-time";
import {findField} from "../fields";
import {GoogleMapsLink} from "../GoogleMapsLink";
import {findCooperationTeamLogos, findTeamLogo} from "../find-team-logo";

export const UpcomingGames = (leagues: League[]) => {
    const sevenDaysFromNow = new Date();

    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)
    sevenDaysFromNow.setHours(0)
    sevenDaysFromNow.setMinutes(0)

    const text = leagues.map(league => {
        const games = getGamesForTeam(BULLS_TEAMS, [league.name], true, true, sevenDaysFromNow)

        if (games.length === 0) {
            return;
        }

        return (
            <div className={"hardbulls-upcoming-game-league"}>
                <strong>{league.fullName}</strong>
                {games.map(game => {
                    const field = findField(game.home, game.venue);

                    if (!field) {
                        throw new Error(`Field ${game.venue} / ${game.home} not found.`)
                    }

                    const home = findTeam(game.home)
                    const away = findTeam(game.away)

                    const homeLogos = home.isCooperation ? findCooperationTeamLogos(home).slice(0, 2) : [findTeamLogo(home)]
                    const awayLogos = away.isCooperation ? findCooperationTeamLogos(away).slice(0, 2) : [findTeamLogo(away)]

                    return (
                        <div>
                            {homeLogos.map(logo => (<img className="hardbulls-team-logo-small" width={32} height={32} src={logo} title={home.name}  alt={home.name}></img>))}
                            vs.
                            {awayLogos.map(logo => (<img className="hardbulls-team-logo-small" width={32} height={32} src={logo} title={away.name}  alt={away.name}></img>))}
                            &nbsp;&mdash;&nbsp;<span title={game.start.map(formatGameTime).join('')}>{game.start.map(formatGameTimeShort).join('')}</span>
                            &nbsp;&mdash;&nbsp;{field ?
                                <GoogleMapsLink label={field.location} venue={field.venue ? `${field.venue}, ${field.location}` : `${field.location}`}/> :
                                <GoogleMapsLink venue={game.venue}/>
                            }
                        </div>
                    )
                })}
            </div>
        );
    }).filter(Boolean)


    return (
        <div className="hardbulls-upcoming-games">
            {text}
        </div>
    )
}
