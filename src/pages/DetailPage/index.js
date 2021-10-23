import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import Hero from "../../components/Hero"
import getSuperhero from "../../services/getSuperhero"

const DetailPage = ({params}) => {
    const [superhero, setSuperhero] = useState()

    useEffect( () => {
        console.log('KEYWORD: ', params.id)
        getSuperhero({id: params.id})
            .then(res => {
                //console.log(res)
                setSuperhero(res)
            })
            .catch(e => {
                console.log(e)
            })
    }, [params.id])
    
    return (<>
        <Row>
            <Col>
                {superhero ? <Hero sh={superhero}/> : null}
            </Col>
        </Row>
    </>)
}

export default DetailPage