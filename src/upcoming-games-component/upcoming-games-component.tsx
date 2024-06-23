import './upcoming-games-component.css'
import {DOMcreateElement} from "../jsx";
import type {League} from "../model/League";
import {GoogleMapsLink} from "../GoogleMapsLink";
import {GamesRepository} from "../repository/games-repository";
import type {Game} from "../model/Game";
import {replaceElementChildren} from "../util/html";
import {dateTimeFormatter, dateTimeFormatterShort} from "../util/date";
import {TeamLogoComponent} from "../team-logo-component/team-logo-component";
import {CooperationTeamLogoComponent} from "../team-logo-component/cooperation-team-logo-component";
import {GAME_CANCELED} from "../translations";

export const UpcomingGamesComponent = () => {
    const CN = "hb-upcoming-games-components"
    const container = <div className={CN}></div>

    (async () => {
        const games = await GamesRepository.findWeeklyGames();

        if (games.length === 0) {
            return;
        }

        const gamesByLeague: {[key: string]: {games: Game[], league: League}} = games.reduce((result, game) => {
            if (!result[game.league.id]) {
                result[game.league.id] = {
                    league: game.league,
                    games: []
                }
            }
            result[game.league.id].games.push(game)

            return result;
        }, {})

        const elements: JSX.Element[] = []

        for (const {games, league} of Object.values(gamesByLeague)) {
            const gameElements: JSX.Element[] = [];

            for (const game of games) {
                const home = game.home;
                const away = game.away
                if (home && away) {
                    const homeLogo = (home.isCooperation ? <CooperationTeamLogoComponent width={32} height={32} team={home}/> : <TeamLogoComponent width={32} height={32} team={home}/>)
                    const awayLogo = (away.isCooperation ? <CooperationTeamLogoComponent width={32} height={32} team={away}/> : <TeamLogoComponent width={32} height={32} team={away}/>)

                    const canceledClass = game.status === 'scheduled' ? `${CN}-game-canceled` : '';

                    const gameElement = (
                        <div className={`${CN}-game ${canceledClass}`}>
                            <div className={`${CN}-team-logo`}>{awayLogo}</div>
                            vs.
                            <div className={`${CN}-team-logo`}>{homeLogo}</div>
                            &nbsp;&mdash;&nbsp;<span title={dateTimeFormatter.format(game.date)}>{dateTimeFormatterShort.format(game.date)}</span>
                            &nbsp;&mdash;&nbsp;
                            {game.venue &&
                                    <GoogleMapsLink
                                        venue={game.venue.venue ? `${game.venue.venue}, ${game.venue.location}` : `${game.venue.location}`}
                                    />
                            }
                        </div>
                    )

                    gameElements.push(gameElement)
                }
            }

            if (gameElements.length > 0) {
                elements.push(
                    <div>
                        <strong>{league.fullName}</strong>
                        <div className={`${CN}-games`}>
                            {gameElements}
                        </div>
                    </div>
                )
            }
        }

        replaceElementChildren(container, elements);
    })()

    return container;
}
