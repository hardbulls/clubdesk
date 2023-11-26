import {DOMcreateElement} from "../jsx";
import {TabsComponent} from "../tabs-component/tabs-component";
import {LeagueComponent} from "../league-component/league-component";
import {getCurrentSeason} from "../current-season";
import {TagComponent} from "../tag-component/tag-component";
import {LeagueRepository} from "../repository/league-repository";

export const LeagueContainerComponent = () => {
    const CN = 'hb-league-container-component'
    const leagues = LeagueRepository.findAll();

    return (
        <div className={CN}>
            <TabsComponent tabs={leagues.map(league => {
                return {
                    id: league.id.toLowerCase(),
                    title: <TagComponent text={league.name} size={'large'}/>,
                    content: () => <LeagueComponent season={getCurrentSeason()} league={league}/>
                }
            })}/>
        </div>
    )
}
