import { FoodDetails } from "./FoodDetails";
import React from "react";
import classNames from "classnames";
import '../styles/scrollbarCustom.css';

interface Alimento {
    nombre: string;
    tipo: string;
    grupo: string;
    indice: string;
}

interface FoodSearcherProps {
    alimento: Alimento[];
}

export const FoodSearcher: React.FC<FoodSearcherProps> = ({ alimento }) => {
    return (
        <div className="h-full overflow-auto mt-[2%] ml-2 mr-1 scroll-container ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-4 overflow-auto ">
                {alimento.map(a => (
                    <div key={a.nombre} className="flex justify-center">
                        <FoodDetails alimento={a} />
                    </div>
                ))}
            </div>
        </div>
    );
};
