const iconsPowerStats = {
    'strength': '💪',
    'durability': '⌛',
    'speed': '🏃‍♂️',
    'intelligence': '🧠',
    'power': '⚡',
    'combat': '🥋'
}
const Powerstats = ({ powerstats }) => {
    
    return (
        <>
            {
                Object.keys(powerstats).map( (key, index) => {
                    return <li key={index}>{ `${iconsPowerStats[key]} ${key}: ${powerstats[key]}` }</li>
                })
            }
        </>
    )
}

export default Powerstats