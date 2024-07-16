import React from 'react';

interface GrupoFilterProps {
    setSelectedGroup: (term: string) => void;
};

export const GrupoFilter:React.FC<GrupoFilterProps> = ({ setSelectedGroup }) => {

    const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGroup(event.target.value);
    };

    return (
        <div >
            <select className='w-full rounded-lg mb- h-8 custom-background custom-border-light border-1 text-center text-lg custom-text-dark '
            onChange={handleGroupChange}>
                <option value="">Todos los grupos</option>
                <option value="carbohidratos">Carbohidratos</option>
                <option value="proteina">Proteínas</option>
                <option value="grasas">Grasas</option>
            </select>
        </div>
    );
};
