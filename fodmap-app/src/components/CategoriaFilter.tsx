import React from 'react';

interface CategoriaFilterProps {
    setSelectedGroup: (term: string) => void;
};

export const CategoriaFilter:React.FC<CategoriaFilterProps> = ({ setSelectedGroup }) => {

    const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setSelectedGroup(event.target.value);
    };

    return (
        <div >
            <select className='w-full rounded-lg  h-8 bg-white border-black border-1 text-center text-lg'
            onChange={handleGroupChange}>
                <option value="">Todos los grupos</option>
                <option value="Frutas">Frutas</option>
            </select>
        </div>
    );
};