import { useEffect, useState } from "react"
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
        {superhero ? <Hero sh={superhero}/> : null}
    </>)
}

export default DetailPage