import { Alert, Button, Card } from "react-bootstrap";
import { useLocation, useRoute } from "wouter";
import Powerstats from "../Powerstats";

import { useDispatch, useSelector } from 'react-redux'
import { addHeroToLeague, eraseHero } from '../../actions'
import { useState } from "react";
import HeroDescription from "../HeroDescription";


function Hero({sh}) {
    const [location, setLocation] = useLocation()
    const [match, params] = useRoute('/')
    const dispatch = useDispatch()
    const league = useSelector(state => state.app.league)
    const [alert, setAlert] = useState(null)

    const addHero = (sh) => {
        if( league.length > 6 ){
            console.log('Su equipo sólo puede contener como máximo 6 héroes.')
            setAlert('Su equipo sólo puede contener como máximo 6 héroes.')
            setTimeout( () => {
                setAlert(null)
            }, 5000)
            return;
        }

        if (league.filter( hero => hero.id === sh.id).length > 0){
            setAlert('Este héroe ya se encuentra en su equipo.')
            setTimeout( () => {
                setAlert(null)
            }, 5000)
        }

        if(league.filter( hero => hero.biography.alignment === 'good').length > 3 || league.filter( hero => hero.biography.alignment === 'bad').length > 3) {
            setAlert('Su equipo debe estar compuesto por tres héroes con orientación buena y tres con orientación mala.')
            setTimeout( () => {
                setAlert(null)
            }, 5000)
        }
        
        if (!alert) {
            dispatch(addHeroToLeague(sh))
            setLocation('/')
        }
    }

    const deleteHero = (heroId) => {
        dispatch(eraseHero(heroId))
    }

    return (
        <> 
            <Card className="my-2">
                <Card.Img variant="top" src={ sh.image ? sh.image.url : ''} />
                <Card.Body className="text-dark">
                    <Card.Title className="text-center">{sh.name}</Card.Title>
                    <Card.Text className="lead" style={{ fontSize: '1rem' }}>
                        {
                            location.startsWith('/search/')
                            ? (
                                <ul>
                                    <Powerstats powerstats={sh.powerstats} />
                                </ul>
                            ) : (
                                location.startsWith('/hero/')
                                    ? (<HeroDescription sh={sh} />)
                                    : null
                            )
                        }
                    </Card.Text>
                </Card.Body>
                {
                    match
                        ? (
                            <>
                                <Button
                                    variant="primary"
                                    onClick={ () => { setLocation(`/hero/${sh.id}`)}}
                                >
                                    See details
                                </Button>
                                <Button
                                    variant="primary"
                                    className="mt-2"
                                    onClick={ () => deleteHero(sh.id) }
                                >
                                    Delete from league
                                </Button>
                            </>
                        )
                        : (
                            location.startsWith('/hero/')
                            ? (<Button variant="primary" onClick={ () => setLocation('/') }>Back to the league</Button>)
                            : (<Button variant="primary" onClick={ () => addHero(sh) }>Add to league</Button>)
                        )
                }
            </Card>
            {
                alert
                    ? (
                        <Alert variant='danger'>{alert}</Alert>
                    )
                    :null
            }
        </>
    )
}
  
export default Hero