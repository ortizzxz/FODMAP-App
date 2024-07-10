import React from "react";


//interfaz Alimento
interface Alimento {
    nombre: string;
    indice: string;
};

// interfaz fooddetail 
interface FoodBuscadorProps {
    alimento: Alimento;
    className?: string; // -> esto para que no de error en FoodSearcher 
};

export const FoodDetails: React.FC<FoodBuscadorProps> = ({ alimento, className }) => {

    const getIndiceClass = (indice: string): string => { // explicacion de porque (indice: type): type -> 
                                                        // es un tipiado para que la funcion tome un string como argumento y que tambien
                                                        // devuelva un string como salida
        switch (indice.toLowerCase()) {
            case 'alto':
                return 'high';
            case 'medio':
                return 'medium';
            case 'bajo':
                return 'low';
            default:
                return '';
        }
    };

    const capitalizeFirstLetter = (string: string): string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    

    return (
        <div className={`product ${getIndiceClass(alimento.indice)}`}>
            <h3>{alimento.nombre}</h3>
            <p>Indice FODMAP: {capitalizeFirstLetter(alimento.indice)}</p>
        </div>
    );
};

// PROP TYPE 