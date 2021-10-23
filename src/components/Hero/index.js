import { Button, Card } from "react-bootstrap";
import { useLocation, useRoute } from "wouter";
import Powerstats from "../Powerstats";

import { useDispatch, useSelector } from 'react-redux'
import { addHeroToLeague, eraseHero, showAlert } from '../../actions'
import HeroDescription from "../HeroDescription";


function Hero({sh}) {
    const [location, setLocation] = useLocation()
    const [match, params] = useRoute('/') // eslint-disable-line
    const dispatch = useDispatch()
    const league = useSelector(state => state.app.league)

    const addHero = (sh) => {
        
        if( league.length > 5 ){
            dispatch(showAlert({ alert: true, message: 'Su equipo sólo puede contener como máximo 6 héroes.'}))
            setTimeout( () => {
                dispatch(showAlert({ alert: false, message: ''}))
            }, 5000)
        }

        if( league.filter( hero => hero.id === sh.id).length > 0 ){
            dispatch(showAlert({ alert: true, message: 'Este héroe ya se encuentra en su equipo.'}))
            setTimeout( () => {
                dispatch(showAlert({ alert: false, message: ''}))
            }, 5000)
        }

        if( sh.biography.alignment === 'good' && league.filter( hero => hero.biography.alignment === 'good').length >= 3  ){
            dispatch(showAlert({ alert: true, message: 'Su equipo debe estar compuesto por tres héroes con orientación buena. Límite superado.'}))
            setTimeout( () => {
                dispatch(showAlert({ alert: false, message: ''}))
            }, 5000)
        }

        if( sh.biography.alignment === 'bad' && league.filter( hero => hero.biography.alignment === 'bad').length >= 3 ){
            dispatch(showAlert({ alert: true, message: 'Su equipo debe estar compuesto por tres héroes con orientación mala. Límite superado.'}))
            setTimeout( () => {
                dispatch(showAlert({ alert: false, message: ''}))
            }, 5000)
        }

        if( league.length < 6 && league.filter( hero => hero.id === sh.id).length === 0 && ((sh.biography.alignment === 'good' && league.filter( hero => hero.biography.alignment === 'good').length <= 3) || ( sh.biography.alignment === 'bad' && league.filter( hero => hero.biography.alignment === 'bad').length <= 3))) {
            dispatch(addHeroToLeague(sh))
            setLocation('/')
        }

    }

    const deleteHero = (heroId) => {
        dispatch(eraseHero(heroId))
    }

    return (
        <> 
            <Card className="my-2" style={{maxWidth: '350px', margin: '0 auto'}}>
                <Card.Img variant="top" src={ sh.image ? sh.image.url : ''} />
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
        </>
    )
}
  
export default Hero