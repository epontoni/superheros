import { useSelector } from "react-redux"
import { useRoute } from "wouter"
import Hero from '../Hero'
import Powerstats from "../Powerstats"
import './HeroLeague.css'

function HeroLeague({league}) {
    //const [loading, setLoading] = useState(false)
    //const [team, setTeam] = useState(league)
    const team = useSelector(state => state.app.league)
    const [matchPath, params] = useRoute('/') // eslint-disable-line

    const sumPowers = (heros, power) => {
        return heros
                .map( function(hero) { return hero.powerstats[power]; })
                .reduce( function(total, value) {
                    if (value === null || value === 'null') {
                        // Some heroes have their stats set to null, so we return zero in this case.
                        return parseInt(total) + 0; 
                    } else {
                        return parseInt(total) + parseInt(value);
                    }
                }, 0 )
    }

    const computeLeagueStats = () => {
        if(team.length > 0) {
            const leagueStats = (Object.keys(team[0].powerstats).map( function(key, index){
                return `${[key]}: ${sumPowers(team, key)}`.split(':')
            })).sort( (a,b) => b[1]-a[1])
        
            const finalStats = {}
        
            for (var idx in leagueStats) {
                finalStats[leagueStats[idx][0]] = leagueStats[idx][1];
            }
            return finalStats
        }
    }

    return (
        <>
            <h2>My hero league</h2>
            {
                team.length > 0
                    ? (
                        <div className="gridResults">
                            {team.map( member => (<Hero key={member.id} sh={member} />) )}
                        </div>
                    )
                    : ('¡Su equipo está vacío! Busque un superhéroe para añadirlo.')
            }

            {
                matchPath && team.length > 0
                ? (<>
                    <fieldset className="mt-4">
                        <legend>League stats</legend>
                        <ul>
                            {
                                <Powerstats powerstats={computeLeagueStats()}/>
                            }
                            
                        </ul>
                    </fieldset>
                </>)
                : null
            }
        </>
    );
  }
  
export default HeroLeague