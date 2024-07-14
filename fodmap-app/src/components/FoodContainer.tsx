import { FoodDetails } from "./FoodDetails";
import React from "react";
import classNames from "classnames";
import '../styles/scrollbarCustom.css';

interface Alimento {
    nombre: string;
    grupo: string;
    indice: string;
    tipo: string;
}

interface FoodSearcherProps {
    alimento: Alimento[];
}

export const FoodSearcher: React.FC<FoodSearcherProps> = ({ alimento }) => {
    return (
        <div className="container mx-auto p-4">
            <div className={classNames('legend', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-3', 'lg:gap-2', 'overflow-auto', 'max-h-screen','lg:max-h-96', 'scrollbar-custom')}>
                {alimento.map(a => (
                    <div key={a.nombre} className="flex justify-center">
                        <FoodDetails alimento={a} />
                    </div>
                ))}
            </div>
        </div>
    );
};
