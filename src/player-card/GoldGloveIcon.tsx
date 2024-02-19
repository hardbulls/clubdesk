import {DOMcreateElement} from "../jsx";
import type {Award} from "../model/Award";

interface Props {
    awards: Award[]
}

export const GoldGloveIcon = ({awards}: Props): JSX.Element => {
    const title = awards.sort((a, b) => a.season - b.season).map(goldGlove => {
        return `${goldGlove.season} ${goldGlove.title}`
    }).join('\n')

    return (
        <div className="has-tooltip" data-tooltip={title}>
            <span className="icon-baseball-glove" style={{color: "#ffe08c"}}/>
        </div>
    )
}
