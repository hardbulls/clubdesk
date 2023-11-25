import './standings-table-component.css'
import {DOMcreateElement} from "../jsx";
import {replaceElementChildren} from "../util/html";
import {findCooperationTeamLogos, findTeamLogo} from "../find-team-logo";
import type {Standing} from "../model/Standing";
import {CooperationLogo} from "../game-table/CoorperationLogo";
import {TeamLogo} from "../game-table/TeamLogo";

type Props = {
    standing: Standing
}
export const StandingsTableComponent = ({standing}: Props) => {
    const CN = 'hb-standings-table-component'
    const container = <div className={CN}></div>

    (async () => {
        const html = (
            <table className={`${CN}-table`}>
                <thead>
                <tr>
                    <th><abbr className="has-tooltip" title="Place">#</abbr></th>
                    <th>Team</th>
                    <th><abbr className="has-tooltip" title="Wins">W</abbr></th>
                    <th><abbr className="has-tooltip" title="Losses">L</abbr></th>
                    <th><abbr className="has-tooltip" title="Wins percentile">PCT</abbr></th>
                </tr>
                </thead>
                <tbody>
                {standing.results.map(row => {
                    const logo = row.team.isCooperation ? <CooperationLogo team={row.team} width={32} height={32}/> : <TeamLogo team={row.team} width={32} height={32}/>

                    return (
                        <tr>
                            <td>{row.position}</td>
                            <td>
                                    <span className="has-tooltip" title={row.team.name}>
                                        {logo}
                                    </span>
                            </td>
                            <td>{row.wins || '0'}</td>
                            <td>{row.loses || '0'}</td>
                            <td>{row.winsPercentage.toFixed(3)}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        )

        replaceElementChildren(container, html)
    })()

    return container
}
