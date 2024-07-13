import React from 'react';

/*
CategoriaFilterProps es una interfaz que describe las props que CategoriaFilter espera recibir. 
setSelectedGroup es una función que toma un string y no devuelve nada (void).
*/ 

interface CategoriaFilterProps {
    setSelectedGroup: React.Dispatch<React.SetStateAction<string>>;
}

// (event: React.ChangeEvent<HTMLSelectElement>)

/** 
 * React.ChangeEvent<HTMLSelectElement> indica que event es un evento de cambio en un elemento <select> HTML. 
 * event.target.value es de tipo string, que es lo que setSelectedGroup espera recibir.
*/
export const CategoriaFilter:React.FC<CategoriaFilterProps> = ({ setSelectedGroup }) => {
    const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGroup(event.target.value);
    };

    return (
        <div className='max-h-96 min-h-96 overflow-x-hidden'>
            <select className='w-full rounded-lg mb-4 h-8 bg-white border-black border-1 text-center text-lg'
             onChange={handleGroupChange}>
                <option value="">Todas las categorías</option>
                <option value="frutas">Frutas</option>
                <option value="legumbres">Legumbres</option>
                <option value="cereales">Cereales</option>
                <option value="lacteos">Lacteos</option>
                <option value="frutos secos y aceites">Frutos secos y Aceites</option>
                <option value="carnes">Carnes</option>
            </select>
        </div>
    );
};
