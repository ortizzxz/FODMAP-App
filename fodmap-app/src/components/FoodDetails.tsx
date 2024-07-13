import React from "react";
import classNames from "classnames";
import '../styles/backgroundCustomColor.css'

// Interfaz Alimento
interface Alimento {
    nombre: string;
    indice: string;
}

// Interfaz FoodBuscadorProps
interface FoodBuscadorProps {
    alimento: Alimento;
    className?: string; // -> esto para que no dé error en FoodSearcher
}

export const FoodDetails: React.FC<FoodBuscadorProps> = ({ alimento, className }) => {

    const getIndiceClass = (indice: string): string => {
        switch (indice.toLowerCase()) {
            case 'alto':
                return 'high'; // Cambia este color según tus necesidades
            case 'medio':
                return 'medium'; // Cambia este color según tus necesidades
            case 'bajo':
                return 'low'; // Cambia este color según tus necesidades
            default:
                return '';
        }
    };

    const capitalizeFirstLetter = (string: string): string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className={classNames('product', getIndiceClass(alimento.indice), className, "border-1 rounded-md w-full sm:w-72 p-4 m-2 text-center shadow-xl")}>
            <h3 className="text-xl">{alimento.nombre}</h3>
            <p className="text-md">Indice FODMAP: {capitalizeFirstLetter(alimento.indice)}</p>
        </div>
    );
};
