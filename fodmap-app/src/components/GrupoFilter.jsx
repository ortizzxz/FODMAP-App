import React from 'react';
import '../styles/App.css'
import '../styles/legendStyle.css'

export const GrupoFilter = ({ setSelectedGroup }) => {
    const handleGroupChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    return (
        <div className='grupoFiltro'>
            <select onChange={handleGroupChange}>
                <option value="">Todos los grupos</option>
                <option value="carbohidratos">Carbohidratos</option>
                <option value="proteina">Proteínas</option>
                <option value="grasas">Grasas</option>
            </select>
        </div>
    );
};
