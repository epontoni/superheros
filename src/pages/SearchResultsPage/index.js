import { useEffect, useState } from "react"
import { Col, Row, Spinner } from "react-bootstrap"
import Hero from "../../components/Hero"
import searchByName from "../../services/searchByName"

const SearchResultsPage = ({params}) => {
    const [results, setResults] = useState()

    useEffect( () => {
        console.log('KEYWORD: ', params.keyword)
        searchByName({keyword: params.keyword})
            .then(res => {
                setResults(res.results)
                console.log(results)
            })
            .catch(e => {
                setResults(['No se encontraron resultados'])
            })
    }, [params.keyword]) // eslint-disable-line
    
    return (<>
        <Row className="d-flex justify-content-center">
            <Col lg={12} md={8} className="my-4">
            <div className="d-flex justify-content-center">
                <h2>Resultados de búsqueda para <strong className="font-weight-bold text-primary">{params.keyword}</strong></h2>
            </div>
                {
                    results
                        ? (
                            <div className="gridResults">
                                {results.map( hero => <Hero key={hero.id} sh={hero}/>)}
                            </div>
                        )
                        : (
                            <div className="d-flex justify-content-center">
                                <Spinner
                                    animation="grow"
                                    variant="primary"
                                />
                            </div>
                        )
                }
                
            </Col>
        </Row>
    </>)
}

export default SearchResultsPage