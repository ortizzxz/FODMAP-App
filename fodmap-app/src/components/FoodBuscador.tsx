import React from 'react';
import '../styles/App.css'
import '../styles/legendStyle.css'

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