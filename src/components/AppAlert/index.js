import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AppAlert() {
    const alert = useSelector(state => state.app.alert)
    
    return (
        alert.alert === true
            ?
            (
                <Alert variant="danger" style={{ maxWidth: '1200px', margin: '0 auto'}}>
                    {alert.message !== '' ? alert.message : ''}
                </Alert>
            )
            :
            ( null )
    )
}
