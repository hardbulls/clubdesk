import {DOMcreateElement} from "../jsx";
import {Award, AwardType} from "../model/Award";

interface Props {
    type: AwardType
    awards: Award[]
}

export const BestPitcherIcon = ({awards, type}: Props): JSX.Element => {
    const title = awards.sort((a, b) => a.season - b.season).map(award => {
        return `${award.season} ${award.title}`
    }).join('\n')

    let color = '#ffe08c';

    if (type === AwardType["2_pitcher"]) {
        color = "#969696";
    } else if (type === AwardType["3_pitcher"]) {
        color = "#815d3f";
    }

    return (
        <div className="has-tooltip" title={title}>
            <span className="icon-baseball-pitcher" style={{color: color}}/>
        </div>
    )
}
