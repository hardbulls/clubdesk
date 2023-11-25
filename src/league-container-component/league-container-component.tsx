import {DOMcreateElement} from "../jsx";
import leagues from '../../config/leagues.json';
import {TabsComponent} from "../tabs-component/tabs-component";
import {LeagueComponent} from "../league-component/league-component";
import {getCurrentSeason} from "../current-season";

const filteredLeagues = leagues.filter(league => league.isActive)

export const LeagueContainerComponent = () => {
    const CN = 'hb-league-container-component'

    return (
        <div className={CN}>
            <TabsComponent linkClass={`${CN}-standings-tab-link`} tabs={filteredLeagues.map(league => {
                return {
                    id: league.id.toLowerCase(),
                    title: (<span title={league.fullName}>{league.name}</span>),
                    content: () => <LeagueComponent season={getCurrentSeason()} league={league}/>
                }
            })}/>
        </div>
    )
}
