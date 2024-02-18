import {DOMcreateElement} from "../jsx";
import {Award, AwardType} from "../model/Award";
import {GoldGloveIcon} from "./GoldGloveIcon";
import type {ReactNode} from "react";
import {AllStarIcon} from "./AllStarIcon";
import {BestBatterIcon} from "./BestBatterIcon";
import {MVPIcon} from "./MVPIcon";
import {BestPitcherIcon} from "./BestPitcherIcon";

interface Props {
    awards: Award[]
}

export const AwardsSection = ({awards}: Props): JSX.Element => {
    const awardsByType: {[key in keyof typeof AwardType]?: Award[]} = awards.reduce((result, award) => {
        if (!result[award.type]) {
            result[award.type] = [];
        }

        result[award.type].push(award);

        return result;
    }, {})

    const awardIcons: ReactNode[] = [];

    if (awardsByType.gold_glove && awardsByType.gold_glove.length > 0) {
        awardIcons.push(
            <GoldGloveIcon awards={awardsByType.gold_glove} />
        )
    }


    if (awardsByType.all_star && awardsByType.all_star.length > 0) {
        awardIcons.push(
            <AllStarIcon awards={awardsByType.all_star} />
        )
    }

    if (awardsByType.mvp && awardsByType.mvp.length > 0) {
        awardIcons.push(
            <MVPIcon awards={awardsByType.mvp} />
        )
    }

    if (awardsByType.best_batter && awardsByType.best_batter.length > 0) {
        awardIcons.push(
            <BestBatterIcon awards={awardsByType.best_batter} type={AwardType.best_batter} />
        )
    }

    if (awardsByType["2_batter"] && awardsByType["2_batter"].length > 0) {
        awardIcons.push(
            <BestBatterIcon awards={awardsByType["2_batter"]} type={AwardType["2_batter"]} />
        )
    }

    if (awardsByType["3_batter"] && awardsByType["3_batter"].length > 0) {
        awardIcons.push(
            <BestBatterIcon awards={awardsByType["3_batter"]} type={AwardType["3_batter"]} />
        )
    }

    if (awardsByType["best_pitcher"] && awardsByType["best_pitcher"].length > 0) {
        awardIcons.push(
            <BestPitcherIcon awards={awardsByType["best_pitcher"]} type={AwardType["best_pitcher"]} />
        )
    }

    if (awardsByType["2_pitcher"] && awardsByType["2_pitcher"].length > 0) {
        awardIcons.push(
            <BestPitcherIcon awards={awardsByType["2_pitcher"]} type={AwardType["2_pitcher"]} />
        )
    }

    if (awardsByType["3_pitcher"] && awardsByType["3_pitcher"].length > 0) {
        awardIcons.push(
            <BestPitcherIcon awards={awardsByType["3_pitcher"]} type={AwardType["3_pitcher"]} />
        )
    }

    return (
        <div>
            { awardIcons}
        </div>
    )
}
