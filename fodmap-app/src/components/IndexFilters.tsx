import React from "react";

interface IndexFilterProps {
    setSelectedIndice: (indice: string) => void;
}

export const IndexFilter: React.FC<IndexFilterProps> = ({ setSelectedIndice }) => {
    const handleIndiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedIndice(event.target.value);
    };

    return (
        <div>
            <select 
                className='w-full rounded-lg h-8 border-1 text-center text-lg bg-[#eeeded]'
                onChange={handleIndiceChange}
                defaultValue=""
            >
                <option value="" disabled hidden>Índice</option>
                <option value="">Todos</option>
                <option value="bajo">Bajo</option>
                <option value="medio">Medio</option>
                <option value="alto">Alto</option>
            </select>
        </div>
    );
};