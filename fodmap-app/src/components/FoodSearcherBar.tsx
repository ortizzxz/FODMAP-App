import React from 'react';

// interfaz para las props del componente
interface FoodBuscadorProps {
    setSearchTerm: (term: string) => void;
}



// tipiamos la const foodbuscador 
export const FoodBuscador: React.FC<FoodBuscadorProps>  = ({ setSearchTerm }) => {
    return (
        <div className='justify-center items-center'>
            <input
            className='w-screen lg:w-full rounded-md h-14  custom-border border-2 custom-searchbar-background p-2 text-lg'
            type="text" 
            placeholder="Buscar alimento..." 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
            />
        </div>
    );
};