import { Col, Row } from "react-bootstrap"
import LoginForm from "../../components/LoginForm"

const LoginPage = () => {
    return (<>
        <Row>
            <Col className="my-4">
                <h2>Login</h2>
                <LoginForm />
            </Col>
        </Row>
    </>)
}

export default LoginPage