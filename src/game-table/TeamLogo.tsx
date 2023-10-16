import {findTeamLogo} from "../find-team-logo";
import {DOMcreateElement} from "../jsx";
import type {Team} from "../model/Team";

export const TeamLogo = ({team}: {team: Team}) => {
    const logo = findTeamLogo(team)

    return (
        <img src={logo} title={team.name} className="hardbulls-team-logo"  alt={team.name}></img>
    )
}
