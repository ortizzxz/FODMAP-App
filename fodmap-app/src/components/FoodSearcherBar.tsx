import React from 'react';

// interfaz para las props del componente
interface FoodBuscadorProps {
    setSearchTerm: (term: string) => void;
}



// tipiamos la const foodbuscador 
export const FoodBuscador: React.FC<FoodBuscadorProps>  = ({ setSearchTerm }) => {
    return (
        <div className='w-full pr-2 justify-center items-center'>
            <input
            className='w-full rounded-md h-14 bg-[#88976c] p-2 text-lg placeholder-custom-placeholder'
            type="text" 
            placeholder="Buscar alimento..." 
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
            />
        </div>
    );
};