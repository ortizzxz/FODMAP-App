import React from 'react';

interface CategoriaFilterProps {
    setSelectedCategory: (term: string) => void;
};

export const CategoriaFilter:React.FC<CategoriaFilterProps> = ({ setSelectedCategory }) => {

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div >
            <select className='w-full rounded-lg  h-8 bg-white border-black border-1 text-center text-lg'
            onChange={handleCategoryChange}>
                <option value="">Todos las categorías</option>
                <option value="legumbres hortalizas">Legumbres y Hortalizas</option>
                <option value="frutas">Frutas</option>
            </select>
        </div>
    );
};