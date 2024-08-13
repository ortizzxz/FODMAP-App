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
            <select className='w-full rounded-lg mb- h-8  border-1 text-center text-lg bg-[#e1e0e0]'
            onChange={handleGroupChange}>
                <option value="">Todos</option>
                <option value="carbohidratos">Carbohidratos</option>
                <option value="proteina">Proteínas</option>
                <option value="grasas">Grasas</option>
            </select>
        </div>
    );
};
