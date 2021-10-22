
const Powerstats = ({ powerstats }) => {
    
    return (
        <>
            {
                Object.keys(powerstats).map( (key, index) => {
                    return <li key={index}>{ `${key}: ${powerstats[key]}` }</li>
                })
            }
        </>
    )
}

export default Powerstats