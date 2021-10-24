import { useEffect, useState } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import Hero from "../../components/Hero"
import getSuperhero from "../../services/getSuperhero"

const DetailPage = ({params}) => {
    const [loading, setLoading] = useState(false)
    const [superhero, setSuperhero] = useState()

    useEffect( () => {
        setLoading(true)
        console.log('KEYWORD: ', params.id)
        getSuperhero({id: params.id})
            .then(res => {
                //console.log(res)
                setSuperhero(res)
                setLoading(false)
            })
            .catch(e => {
                console.log(e)
            })
    }, [params.id])
    
    return (<>
        <Row>
            <Col>
                { loading
                    ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <Spinner animation="grow" variant="primary" />
                        </div>
                    )
                    : ( 
                        superhero
                        ? <Hero sh={superhero} />
                        : null
                    )
                }
            </Col>
        </Row>
    </>)
}

export default DetailPage