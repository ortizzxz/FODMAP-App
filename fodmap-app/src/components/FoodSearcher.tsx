import { FoodDetails } from "./FoodDetails"
import React from "react";

interface Alimento {
    nombre: string;
    grupo: string;
    indice: string;
}

interface FoodSearcherProps{
    alimento: Alimento[];
}

export const FoodSearcher: React.FC<FoodSearcherProps> = ({ alimento }) => {

    return (
        <div id="productGrid">
            {alimento.map(a => { // AQUI SE MAPEA FOR EACH ALIMENTO
                return <FoodDetails alimento={a} 
                                    key={a.nombre} 
                                    className={`product ${a.grupo}`} 
                        />
            })}
        </div>
    )

}   


