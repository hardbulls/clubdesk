import {DOMcreateElement} from "../jsx";
import {GameCardContainer} from "./GameCardContainer";
import leagues from '../../config/leagues.json';
import {BULLS_TEAMS} from "../team/teams";

export const GamePlanTabs = () => {
    const currentActive = "bbl";

    const switchTab = (currentLink: HTMLElement, league: string) => {
        // Get all elements with class="tabcontent" and hide them
        const tabs = document.getElementsByClassName("harbulls-gameplan-tab-content");

        for (const tab of tabs) {
            const tabElement = tab as HTMLElement

            if (tabElement.id !== `hardbulls-gameplan-${league}`) {
                tabElement.classList.remove("active-tab")
                tabElement.classList.add("inactive-tab");
            } else {
                tabElement.classList.remove("inactive-tab");
                tabElement.classList.add("active-tab")
            }
        }

        const links = document.getElementsByClassName("hardbulls-tab-link");

        for (const link of links) {
            const linkElement = (link as HTMLLinkElement);

            if (linkElement !== currentLink) {
                linkElement.classList.remove("active-tab");
                linkElement.classList.add("inactive-tab");
            } else {
                linkElement.classList.remove("inactive-tab");
                linkElement.classList.add("active-tab");
            }
        }
    };

    const filteredLeagues = leagues.filter(league => league.isActive)


    const linkElements = (
        <div className="hardbulls-gameplan-tab-links">
            {filteredLeagues.map((league) => {
                return (
                    <span
                        className={`hardbulls-tab-link ${league.id === currentActive ? "active-tab" : 'inactive-tab'}`}
                        onClick={(event) => switchTab(event.currentTarget, league.id)} title={league.fullName}>{league.name}</span>
                );
            })}
        </div>
    )

    const tabElements = filteredLeagues.map(league => {
        const id = `hardbulls-gameplan-${league.id}`;

        return (
            <div id={id}
                 className={`harbulls-gameplan-tab-content ${league.id === currentActive ? "active-tab" : 'inactive-tab'}`}>
                <GameCardContainer teams={BULLS_TEAMS} league={league.name}/>
            </div>
        );
    })

    return (
        <div>
            {linkElements}
            {tabElements}
        </div>
    )
}
