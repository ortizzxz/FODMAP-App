import React from 'react';
import '../styles/App.css'
import '../styles/legendStyle.css'

export const CategoriaFilter = ({ setSelectedGroup }) => {
    const handleGroupChange = (event) => {
        setSelectedGroup(event.target.value);
    };

    return (
        <div className='grupoFiltro'>
            <select onChange={handleGroupChange}>
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
