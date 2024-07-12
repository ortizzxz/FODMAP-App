import React from 'react';

// interfaz para las props del componente
interface FoodBuscadorProps {
    setSearchTerm: (term: string) => void;
}



// tipiamos la const foodbuscador 
export const FoodBuscador: React.FC<FoodBuscadorProps>  = ({ setSearchTerm }) => {
    return (
        <div className='flex justify-center items-center'>
            <input
            className=' w-2/5 rounded-md mb-4 h-8 bg-white border-black border-1 text-center text-lg'
            type="text" 
            placeholder="Buscar alimento..."
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
            />
        </div>
    );
};