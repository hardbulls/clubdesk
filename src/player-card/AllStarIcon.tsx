import {DOMcreateElement} from "../jsx";
import type {Award} from "../model/Award";

interface Props {
    awards: Award[]
}

export const AllStarIcon = ({awards}: Props): JSX.Element => {
    const title = awards.sort((a, b) => a.season - b.season).map(award => {
        return `${award.season} ${award.title}`
    }).join('\n')

    return (
        <div className="has-tooltip" data-tooltip={title}>
            <span className="icon-star" style={{color: "#ffe08c"}}/>
        </div>
    )
}
