import {DOMcreateElement} from "../jsx";
import {findCooperationTeamLogos} from "../find-team-logo";
import type {Team} from "../model/Team";

type Props = {
    team: Team,
    width?: number,
    height?: number
}

export const CooperationLogo = ({team, width, height}: Props) => {
    const logos = findCooperationTeamLogos(team).slice(0, 2)
    const style1 = {
        clipPath: 'polygon(50% 0%, 50% 100%, 0% 100%,0% 0%)',
    }
    const style2 = {
        clipPath: 'polygon(100% 0%, 100% 100%, 50% 100%, 50% 0%)',
        position: 'absolute',
        left: 0,
    }

    return (
        <div className="hardbulls-team-logo" title={team.name} style={{textAlign: "center"}}>
            <div style={{
                width: 'min-content'
            }}>
                {logos.map((logo, index) => {
                    return (
                        <img src={logo} alt={team.name} width={width} height={height}
                             style={index === 0 ? style1 : style2}
                        ></img>
                    )
                })}
            </div>
        </div>
    )
}
