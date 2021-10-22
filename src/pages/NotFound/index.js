import { Row, Col } from 'react-bootstrap'
import { Link } from 'wouter'

const NotFound = ({params}) => {
    return (
        <Row>
            <Col className='text-center my-4 py-4'>
                <p style={ {fontSize: '4rem'} }>🦸‍♂️</p>
                <h2>404, Sorry the page <strong className='text-primary'>{params.rest}</strong> does not exist!</h2>
                Go <Link to='/'>Home</Link>.
            </Col>
        </Row>
    )
}

export default NotFound