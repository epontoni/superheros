export default function HeroDescription({sh}) {
    return (
        <ul>
            <li>Peso: {sh.appearance.weight[1]}</li>
            <li>Altura: {sh.appearance.height[1]}</li>
            <li>Nombre: {sh.name}</li>
            <li>Alias: {sh.biography.aliases[0]}</li>
            <li>Color de ojos: {sh.appearance["eye-color"]}</li>
            <li>Color de cabello: {sh.appearance["hair-color"]}</li>
            <li>Lugar de trabajo: {sh.work.occupation}</li>
        </ul>
    )
}
