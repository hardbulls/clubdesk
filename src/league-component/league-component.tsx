import './league-component.css'
import {replaceElementChildren} from "../util/html";
import {DOMcreateElement} from "../jsx";
import type {League} from "../model/League";
import {API_BASE_URL} from "../config";
import {CALENDAR_IMPORT, GAME_SCHEDULE, OFFICIAL_SCHEDULE, SEASON, SELECT_SEASON} from "../translations";
import {SelectComponent} from "../select-component/select-component";
import {getCurrentSeason} from "../current-season";


type Props = {
    season: number,
    league: League
    handleSeasonChange: (season: number, league: League, container: JSX.Element) => void
}

export const LeagueComponent = ({season, league, handleSeasonChange}: Props) => {
    const CN = 'hb-league-component'
    const container = <div className={CN}></div>

    (async () => {
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
                                season === getCurrentSeason() &&
                                (<div>
                                    <div>
                                        <span className="fa fa-calendar-alt"></span>&nbsp;
                                        {CALENDAR_IMPORT} <input type="text" dir="rtl" readOnly value={calendarUrl}/>
                                        {' '}
                                        <div style={{gap: '8px', display: 'inline-flex'}}>
                                            <button style={{cursor: "pointer"}}>
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
                                                <span
                                                    title="Anleitung Spielplan im Kalender importieren"
                                                    className="fa fa-info-circle" style={{color: '#000000'}}>
                                                </span>
                                            </a>
                                            {' '}
                                            <a href={calendarUrl} target="_blank">
                                                <span
                                                    title="Kalender downloaden"
                                                    className="fa fa-download" style={{color: '#000000'}}>

                                                </span>
                                            </a>
                                        </div>
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
                        </div>
                    </div>
                    <div>
                        <h3>{GAME_SCHEDULE}</h3>
                        <div className={`${CN}-games`}>
                            <iframe src={`https://app.hardbulls.com/embed?league=${league.id}&season=${season}&theme=light`}
                                    id="hb-games-iframe"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        );

        replaceElementChildren(container, html)
    })()

    return container
}
