import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "wouter"
import { logOutUser } from "../../actions"
import CaptainKwik from './CaptainKwik.png'

export default function LogoutPage() {
    const [location, setLocation] = useLocation() // eslint-disable-line
    const dispatch = useDispatch()
    useEffect(() => {
        window.localStorage.removeItem('loggedAppUser')
        dispatch(logOutUser())
        setTimeout( ()=> {
            setLocation('/login')
        }, 5000)
    }, []) // eslint-disable-line
    return (
        <div>
            <h2>Login out...</h2>
            <img src={CaptainKwik} alt="Vuelva prontos" style={ { maxWidth: '500px', width: '100%' } }/>
        </div>
    )
}
