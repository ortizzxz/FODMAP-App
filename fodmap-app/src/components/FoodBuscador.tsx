import React from 'react';

// interfaz para las props del componente
interface FoodBuscadorProps {
    setSearchTerm: (term: string) => void;
}



// tipiamos la const foodbuscador 
export const FoodBuscador: React.FC<FoodBuscadorProps>  = ({ setSearchTerm }) => {
    return (
        <input
            type="text"
            placeholder="Buscar alimento..."
            id="searchBar"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
        />
    );
};