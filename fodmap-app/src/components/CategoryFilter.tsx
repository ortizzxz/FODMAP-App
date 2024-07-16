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
            <select className='w-full rounded-lg  h-8 custom-background custom-border border-1 text-center text-lg custom-text-dark'
            onChange={handleCategoryChange}>
                <option value="">Todos las categorías</option>
                <option value="legumbres hortalizas">Legumbres y Hortalizas</option>
                <option value="frutas">Frutas</option>
                <option value="cereales">Cereales</option>
                <option value="lácteos">Lácteos</option>
                <option value="pescados carnes huevos ultraprocesado">Pescados y Carnes</option>
                <option value="edulcorantes">Edulcorantes</option>
                <option value="frutos secos y aceites alcohol">Otros</option>
            </select>
        </div>
    );
};