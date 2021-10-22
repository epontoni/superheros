import { useState } from "react"
import { useSelector } from "react-redux"
//import { Spinner } from "react-bootstrap"
import { useRoute } from "wouter"
//import getSuperheros from "../../services/getSuperheros"
import Hero from '../Hero'
import Powerstats from "../Powerstats"

function HeroLeague({league}) {
    const [loading, setLoading] = useState(false)
    //const [team, setTeam] = useState(league)
    const team = useSelector(state => state.app.league)
    const [matchPath, params] = useRoute('/')

    const sumPowers = (heros, power) => {
        return heros
                .map( function(hero) { return hero.powerstats[power]; })
                .reduce( function(total, value) { return parseInt(total) + parseInt(value); }, 0 )
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
            <h2>Hero Team</h2>
            {
                team.length > 0
                    ? (
                        <div className="d-flex justify-content-center gridResults">
                            {team.map( member => (<Hero key={member.id} sh={member} />) )}
                        </div>
                    )
                    : ('¡Su equipo está vacío! Busque un superhéroe para añadirlo.')
            }

            {
                matchPath && team.length > 0
                ? (<>
                    <h4>Team stats</h4>
                    <ul>
                        {
                            <Powerstats powerstats={computeLeagueStats()}/>
                        }
                        
                    </ul>
                </>)
                : null
            }
        </>
    );
  }
  
export default HeroLeague


/*
loading
? (<Spinner animation="grow" variant="primary" />)
: <Hero sh={superheros}/>
*/