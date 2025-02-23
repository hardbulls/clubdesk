import './league-component.css'
import {replaceElementChildren} from "../util/html";
import {DOMcreateElement} from "../jsx";
import type {League} from "../model/League";
import {API_BASE_URL} from "../config";
import {GamesRepository} from "../repository/games-repository";
import {GameCardComponent} from "../game-card-component/game-card-component";
import {
    CALENDAR_IMPORT, GAME_SCHEDULE, OFFICIAL_SCHEDULE, SEASON, SELECT_SEASON, STANDINGS_EAST,
    STANDINGS_FINAL, STANDINGS_FINAL_TOURNAMENT,
    STANDINGS_GROUP, STANDINGS_HEADER, STANDINGS_MIDDLE,
    STANDINGS_PLAYOFFS,
    STANDINGS_REGULAR, STANDINGS_UNKNOWN, STANDINGS_WEST
} from "../translations";
import {TabsComponent} from "../tabs-component/tabs-component";
import {StandingsRepository} from "../repository/standings-repository";
import type {Standing} from "../model/Standing";
import {StandingsTableComponent} from "../standings-table-component/standings-table-component";
import {TagComponent} from "../tag-component/tag-component";
import {SelectComponent} from "../select-component/select-component";
import {getCurrentSeason} from "../current-season";
import {LogoMapping} from "../logos";


type Props = {
    season: number,
    league: League
    handleSeasonChange: (season: number, league: League, container: JSX.Element) => void
}

const getStandingsTitle = (standing: Standing) => {
    if (standing.type === 'FINAL') {
        return STANDINGS_FINAL;
    }

    if (standing.type === 'FINAL_TOURNAMENT') {
        return STANDINGS_FINAL_TOURNAMENT;
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

    if (standing.type === 'WEST') {
        return `${STANDINGS_WEST}`
    }

    if (standing.type === 'EAST') {
        return `${STANDINGS_EAST}`
    }

    if (standing.type === 'MIDDLE') {
        return `${STANDINGS_MIDDLE}`
    }

    return `${STANDINGS_UNKNOWN}`
}

export const LeagueComponent = ({season, league, handleSeasonChange}: Props) => {
    const CN = 'hb-league-component'
    const container = <div className={CN}></div>

    (async () => {
        const games = await GamesRepository.findByLeagueAndSeason(league, season);
        const standings = await StandingsRepository.findByLeagueAndSeason(league, season);
        const now = new Date();

        const hasFutureGames = games.some(game => game.date > now)
        const calendarUrl = `${API_BASE_URL}seasons/${season}/${league.id}/games.ics`

        if (!container) {
            return;
        }

        const html = (
            <div>
                <h2>{league.fullName} ({league.name})</h2>
                <div className={`${CN}-content`}>
                    <div className={`${CN}-info`}>
                        <div className={`${CN}-description`}>
                            {
                                league.seasons.length > 1 ?
                                    (<SelectComponent
                                        selected={season}
                                        onChange={(selectedSeason) => {
                                            handleSeasonChange(Number.parseInt(selectedSeason), league, container)
                                        }}
                                        label={SELECT_SEASON}
                                        options={league.seasons.sort().reverse().map(leagueSeason => {
                                                return {value: leagueSeason, label: leagueSeason}
                                            }
                                        )}/>) : (
                                        <span className={`${CN}-season`}>{SEASON} {season}</span>
                                    )
                            }
                            {
                                season === getCurrentSeason() && hasFutureGames &&
                                (<div>
                                    <div>
                                        <span className="fa fa-calendar-alt" ></span>&nbsp;
                                        {CALENDAR_IMPORT} <input type="text" dir="rtl" readOnly value={calendarUrl}/>
                                        {' '}
                                        <button style={{ cursor: "pointer" }}> 
                                            <span className="fa fa-copy" 
                                                title="Kalender URL in die Zwischenablage zu kopieren"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(calendarUrl)
                                                }}
                                            >   
                                            </span>
                                        </button>
                                        {' '}
                                        <a href="/spielplan/kalender-anleitung" target="_blank">
                                            <span className="fa fa-info-circle" style={{ color: '#000000'}}></span>
                                        </a>
                                    </div>
                                    {
                                        league.url && (
                                            <div>
                                                <span className="fa fa-external-link-alt"></span>&nbsp;
                                                <a target="_blank" href={league.url}>{OFFICIAL_SCHEDULE}</a>
                                            </div>
                                        )
                                    }
                                </div>)
                            }
                            {
                                LogoMapping[`./${league.id}.svg`] && (
                                    <div className={`${CN}-logo`}>
                                        <img alt={`${league.name} Logo`} src={LogoMapping[`./${league.id}.svg`]}/>
                                    </div>
                                )
                            }
                        </div>
                        {standings.length > 0 && (
                            <div className={`${CN}-standings`}>
                                <h3>{STANDINGS_HEADER}</h3>
                                {standings.length > 1 ? (
                                        <TabsComponent links={false} tabs={standings.map(standing => {
                                            return {
                                                id: standing.type.toLowerCase(),
                                                title: <TagComponent text={getStandingsTitle(standing)} size={'small'}/>,
                                                content: () => <StandingsTableComponent standing={standing}/>
                                            }
                                        })}/>)
                                    : (standings[0] && <StandingsTableComponent standing={standings[0]}/>)
                                }
                            </div>
                        )}
                    </div>
                    <div>
                        <h3>{GAME_SCHEDULE}</h3>
                        <div className={`${CN}-games`}>
                            {games.map(game => <GameCardComponent game={game}/>)}
                        </div>
                    </div>

                </div>
            </div>
        );

        replaceElementChildren(container, html)
    })()

    return container
}
