import { FoodDetails } from "./FoodDetails"
import React from "react";
import classNames from "classnames";

import '../styles/scrollbarCustom.css'


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
        <div  className={classNames('legend', 'overflow-auto', 'max-h-96')}>
            {alimento.map(a => {
                
                return <div className="inline-flex  min-h-32 max-h-32">
                    
                    <FoodDetails alimento={a} key={a.nombre}/>
                
                </div>
            })}
        </div>
    )

}   


