import React from "react";
import { Alimento } from "./types";
import '../styles/backgroundCustomColor.css';

interface FoodDetailsProps {
    alimento: Alimento;
}

export const FoodDetails: React.FC<FoodDetailsProps> = ({ alimento }) => {

    const capitalizeFirstLetter = (string: string): string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="border-1 border-second bg-third rounded-md w-full p-4 m-2 text-center shadow-xl">
            <h3 className="text-2xl">{alimento.nombre}</h3>
            <p className="text-lg">Indice FODMAP: {capitalizeFirstLetter(alimento.indice)}</p>
        </div>
    );
};
