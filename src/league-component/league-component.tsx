import './league-component.css'
import {replaceElementChildren} from "../util/html";
import {DOMcreateElement} from "../jsx";
import type {League} from "../model/League";
import {API_V2_BASE_URL} from "../config";
import {GamesRepository} from "../repository/games-repository";
import {GameCardComponent} from "../game-card-component/game-card-component";
import {
    CALENDAR_IMPORT, GAME_SCHEDULE,
    STANDINGS_FINAL,
    STANDINGS_GROUP, STANDINGS_HEADER,
    STANDINGS_PLAYOFFS,
    STANDINGS_REGULAR, STANDINGS_UNKNOWN
} from "../translations";
import {TabsComponent} from "../tabs-component/tabs-component";
import {StandingsRepository} from "../repository/standings-repository";
import type {Standing} from "../model/Standing";
import {StandingsTableComponent} from "../standings-table-component/standings-table-component";


type Props = {
    season: number,
    league: League
}

const getStandingsTitle = (standing: Standing) => {
    if (standing.type === 'FINAL') {
        return STANDINGS_FINAL;
    }

    if (standing.type === 'GROUP_A') {
        return `${STANDINGS_GROUP} A`
    }

    if (standing.type === 'GROUP_B') {
        return `${STANDINGS_GROUP} B`
    }

    if (standing.type === 'GROUP_C') {
        return `${STANDINGS_GROUP} C`
    }

    if (standing.type === 'PLAYOFF') {
        return `${STANDINGS_PLAYOFFS}`
    }

    if (standing.type === 'REGULAR') {
        return `${STANDINGS_REGULAR}`
    }

    return `${STANDINGS_UNKNOWN}`
}

export const LeagueComponent = ({season, league}: Props) => {
    const CN = 'hb-league-component'
    const container = <div className={CN}></div>

    (async () => {
        const games = await GamesRepository.findByLeagueAndSeason(league, season);
        const standings = await StandingsRepository.findByLeagueAndSeason(league, season);
        const calendarUrl = `${API_V2_BASE_URL}seasons/${season}/bbl/games.ics`

        if (!container) {
            return;
        }

        const html = (
            <div>
                <h2>{league.fullName} ({league.name})</h2>
                <div className={`${CN}-content`}>
                    <div>
                        <h3>{GAME_SCHEDULE}</h3>
                        <div className={`${CN}-games`}>
                            {games.map(game => <GameCardComponent game={game}/>)}
                        </div>
                    </div>
                    <div className={`${CN}-info`}>
                        <div className={`${CN}-description`}>
                            <span className="fa fa-calendar-alt"></span>&nbsp;
                            <a href={calendarUrl}>{CALENDAR_IMPORT}</a>
                        </div>
                        {standings.length > 0 && (
                            <div className={`${CN}-standings`}>
                                <h3>{STANDINGS_HEADER}</h3>
                                {standings.length > 1 ? (
                                        <TabsComponent linkClass={`${CN}-standings-tab-link`} tabs={standings.map(standing => {
                                            return {
                                                id: standing.type.toLowerCase(),
                                                title: (<span>{getStandingsTitle(standing)}</span>),
                                                content: () => <StandingsTableComponent standing={standing}/>
                                            }
                                        })}/>)
                                    : (standings[0] && <StandingsTableComponent standing={standings[0]}/>)
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );

        replaceElementChildren(container, html)
    })()

    return container
}
