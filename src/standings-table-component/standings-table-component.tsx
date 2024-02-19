import './standings-table-component.css'
import {DOMcreateElement} from "../jsx";
import {replaceElementChildren} from "../util/html";
import type {Standing} from "../model/Standing";
import {CooperationTeamLogoComponent} from "../team-logo-component/cooperation-team-logo-component";
import {TeamLogoComponent} from "../team-logo-component/team-logo-component";

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
                    <th><abbr className="has-tooltip" data-tooltip="Place">#</abbr></th>
                    <th>Team</th>
                    <th><abbr className="has-tooltip" data-tooltip="Wins">W</abbr></th>
                    <th><abbr className="has-tooltip" data-tooltip="Losses">L</abbr></th>
                    <th><abbr className="has-tooltip" data-tooltip="Wins percentile">PCT</abbr></th>
                </tr>
                </thead>
                <tbody>
                {standing.results.map(row => {
                    const logo = row.team.isCooperation ? <CooperationTeamLogoComponent team={row.team} width={32} height={32}/> :
                        <TeamLogoComponent team={row.team} width={32} height={32}/>

                    return (
                        <tr>
                            <td>{row.position}</td>
                            <td>
                                    <span className="has-tooltip" data-tooltip={row.team.name}>
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
