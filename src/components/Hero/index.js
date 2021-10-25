import { Button, Card } from "react-bootstrap";
import { useLocation, useRoute } from "wouter";
import Powerstats from "../Powerstats";

import { useDispatch, useSelector } from 'react-redux'
import { addHeroToLeague, eraseHero, showAlert } from '../../actions'
import HeroDescription from "../HeroDescription";

import './Hero.css'
import { useState } from "react";


function Hero({sh}) {
    const [location, setLocation] = useLocation()
    const [match, params] = useRoute('/') // eslint-disable-line
    const dispatch = useDispatch()
    const league = useSelector(state => state.app.league)
    const [error, setError] = useState(false)

    const addHero = (sh) => {
        console.log('Validando admisión de héroe...')
        console.log('Miembros en la liga: ', league.length)
        console.log(`Miembros según su orientación:\nBuena: ${league.filter( member => member.biography.alignment === 'good').length} \nMala:${league.filter( member => member.biography.alignment === 'bad').length}`)
        console.log(`El héroe ${sh.name} esta en la liga: ${league.filter( hero => hero.id === sh.id).length > 0}`)
        
        if( league.length > 5 ){
            setError(true)
            dispatch(showAlert({ alert: true, message: 'Su equipo sólo puede contener como máximo 6 héroes.'}))
            setTimeout( () => {
                dispatch(showAlert({ alert: false, message: ''}))
            }, 5000)
            return;
        }

        if( league.filter( hero => hero.id === sh.id).length > 0 ){
            dispatch(showAlert({ alert: true, message: 'Este héroe ya se encuentra en su equipo.'}))
            setError(true)
            setTimeout( () => {
                dispatch(showAlert({ alert: false, message: ''}))
            }, 5000)
            return;
        }

        if( sh.biography.alignment === 'good' && league.filter( hero => hero.biography.alignment === 'good').length >= 3  ){
            dispatch(showAlert({ alert: true, message: 'Su equipo debe estar compuesto por tres héroes con orientación buena. Límite superado.'}))
            setError(true)
            setTimeout( () => {
                dispatch(showAlert({ alert: false, message: ''}))
            }, 5000)
            return;
        }

        if( sh.biography.alignment === 'bad' && league.filter( hero => hero.biography.alignment === 'bad').length >= 3 ){
            dispatch(showAlert({ alert: true, message: 'Su equipo debe estar compuesto por tres héroes con orientación mala. Límite superado.'}))
            setError(true)
            setTimeout( () => {
                dispatch(showAlert({ alert: false, message: ''}))
            }, 5000)
            return;
        }

        if( !error ) {
            dispatch(addHeroToLeague(sh))
            setLocation('/')
        }

    }

    const deleteHero = (heroId) => {
        dispatch(eraseHero(heroId))
    }

    const imgStyles = {
        minHeight: '275px',
        maxHeight: '350px',
        objectFit: 'cover',
    }

    return (
        <> 
            <Card className={"my-2 " + sh?.biography?.alignment } style={{maxWidth: '350px', margin: '0 auto'}}>
                <Card.Img variant="top" src={ sh.image ? sh.image.url : ''} style={imgStyles} />
                <Card.Body className="text-dark">
                    <Card.Title className="text-center">{sh.name}</Card.Title>
                    <div className="lead" style={{ fontSize: '1rem' }}>
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
                    </div>
                </Card.Body>
                {
                    match
                        ? (
                            <>
                                <Button
                                    variant="light"
                                    size='sm'
                                    onClick={ () => { setLocation(`/hero/${sh.id}`)}}
                                >
                                    See details
                                </Button>
                                <Button
                                    variant="light"
                                    size='sm'
                                    className="mt-2"
                                    onClick={ () => deleteHero(sh.id) }
                                >
                                    Delete from league
                                </Button>
                            </>
                        )
                        : (
                            location.startsWith('/hero/')
                            ? (<Button variant="light" size='sm' onClick={ () => setLocation('/') }>Back to the league</Button>)
                            : (<Button variant="light" size='sm' onClick={ () => addHero(sh) }>Add to league</Button>)
                        )
                }
            </Card>
        </>
    )
}
  
export default Hero