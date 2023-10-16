import './standings.css'
import {DOMcreateElement} from "../jsx";
import {replaceElementChildren} from "../util/html";
import type {LeagueStandings} from "../model/LeagueStandings";
import {findTeamLogo} from "../find-team-logo";
import {fetchApi} from "../api";

export const Standings = () => {
    (async () => {
        const json = await fetchApi('bbl_2023.json') as LeagueStandings[]

        const container = document.querySelector('.hardbulls-standings-container') as HTMLElement;

        if (!container) {
            return;
        }

        const table = (
            <table className="hardbulls-standings-table">
                <thead>
                    <tr>
                        <th><abbr className="has-tooltip" title="Place">#</abbr></th>
                        <th>Team</th>
                        <th><abbr className="has-tooltip" title="Wins">W</abbr></th>
                        <th><abbr className="has-tooltip" title="Losses">L</abbr></th>
                        <th><abbr className="has-tooltip" title="Wins percentile">PCT</abbr></th>
                        <th><abbr className="has-tooltip" title="Games Behind">GB</abbr></th>
                    </tr>
                </thead>
                <tbody>
                    {json.map(row => {
                        const logo = findTeamLogo(row.team);
                        return (
                            <tr>
                                <td>{row.place}</td>
                                <td>
                                    <span className="has-tooltip" title={row.team.name}>
                                        <img alt={row.team.name} width={32} height={32} src={logo}/>
                                    </span>
                                </td>
                                <td>{row.wins || '0'}</td>
                                <td>{row.losses || '0'}</td>
                                <td>{row.percentile.toFixed(3)}</td>
                                <td>{row.gamesBehind || '0'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )

        replaceElementChildren(container, table)
    })()

   return (<div></div>)
}
