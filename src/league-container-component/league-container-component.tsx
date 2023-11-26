import {DOMcreateElement} from "../jsx";
import {TabsComponent} from "../tabs-component/tabs-component";
import {LeagueComponent} from "../league-component/league-component";
import {getCurrentSeason} from "../current-season";
import {TagComponent} from "../tag-component/tag-component";
import {LeagueRepository} from "../repository/league-repository";
import {replaceElement} from "../util/html";
import type {League} from "../model/League";

export const LeagueContainerComponent = () => {
    const CN = 'hb-league-container-component'
    const leagues = LeagueRepository.findAll();

    const handleSeasonChange = (selectedSeason: number, league: League, container: JSX.Element) => {
        const component = <LeagueComponent handleSeasonChange={handleSeasonChange} season={selectedSeason} league={league}/>

        replaceElement(container, component)

    }

    return (
        <div className={CN}>
            <TabsComponent tabs={leagues.map(league => {
                return {
                    id: league.id.toLowerCase(),
                    title: <TagComponent text={league.name} size={'large'}/>,
                    content: () => <LeagueComponent handleSeasonChange={handleSeasonChange} season={getCurrentSeason()} league={league}/>
                }
            })}/>
        </div>
    )
}
