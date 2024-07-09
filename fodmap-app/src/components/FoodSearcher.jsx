import { FoodDetails } from "./FoodDetails"
import '../styles/App.css'
import '../styles/legendStyle.css'

export const FoodSearcher = ({ alimento }) => {

    return (
        <div id="productGrid">
            {alimento.map(a => { // AQUI SE MAPEA FOR EACH ALIMENTO
                return <FoodDetails alimento={a} key={a.nombre} className={ 'product ${item.grupo}'}/> // AQUI VA UNA FUNCION QUE HAGA UN DISPLAY DE CADA ALIMENTO
            })}
        </div>
    )

}   


