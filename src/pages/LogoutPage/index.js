import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "wouter"
import { logOutUser } from "../../actions"
import apu from './apu.png'

export default function LogoutPage() {
    const [location, setLocation] = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        window.localStorage.removeItem('loggedAppUser')
        dispatch(logOutUser())
        setTimeout( ()=> {
            setLocation('/login')
        }, 5000)
    }, [])
    return (
        <div>
            <h2>Login out...</h2>
            <img src={apu} alt="Vuelva prontos" style={ { maxWidth: '500px' } }/>
        </div>
    )
}
