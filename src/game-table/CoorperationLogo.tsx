import {DOMcreateElement} from "../jsx";
import {findCooperationTeamLogos} from "../find-team-logo";
import type {Team} from "../model/Team";

export const CooperationLogo = ({team}: {team:Team}) => {
    const logos = findCooperationTeamLogos(team).slice(0, 2)
    const style1 = {
        clipPath: 'polygon(50% 0%, 50% 100%, 0% 100%,0% 0%)'
    }
    const style2 = {
        clipPath: 'polygon(100% 0%, 100% 100%, 50% 100%, 50% 0%)',
        marginLeft: '-100px'
    }

    return (
        <div className="hardbulls-team-logo" title={team.name}>
            {logos.map((logo, index) => {
                return (
                    <img src={logo} alt={team.name}
                         style={index === 0 ? style1 : style2}
                    ></img>
                )
            })}
        </div>
    )
}
