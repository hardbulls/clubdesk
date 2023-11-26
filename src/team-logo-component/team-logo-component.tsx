import {findTeamLogo} from "../find-team-logo";
import {DOMcreateElement} from "../jsx";
import type {Team} from "../model/Team";

type Props = {
    team: Team,
    width?: number,
    height?: number
}

export const TeamLogoComponent = ({team, width, height}: Props) => {
    const logo = findTeamLogo(team)

    return (
        <img src={logo} width={width} height={height} title={team.name} alt={team.name}></img>
    )
}
