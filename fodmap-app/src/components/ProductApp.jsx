import { useState } from 'react';
import { findAll } from '../services/foodService';
import '../styles/App.css'
import '../styles/legendStyle.css'
import { FoodSearcher } from './FoodSearcher'
import { useEffect } from 'react';
import { FoodBuscador } from './FoodBuscador';
import { GrupoFilter } from './GrupoFilter';
import { CategoriaFilter } from './CategoriaFilter';

export const ProductApp = () => {

    const [alimentos, setAlimentos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');

    const getFood = async () => {
        const result = await findAll();

        console.log(result.data._embedded.alimentoes); // Verifica la estructura de los datos
        setAlimentos(result.data._embedded.alimentoes); // nombre de la tabla, no de la entidad.
    };

    useEffect(() => {
        getFood();
    }, []);

    const normalizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const filteredAlimentos = alimentos.filter(alimento =>
        normalizeString(alimento.nombre.toLowerCase()).includes(normalizeString(searchTerm.toLowerCase())) &&
        (selectedGroup === '' || alimento.grupo.toLowerCase() === selectedGroup.toLocaleLowerCase())
    );

    return (
        <>
            <div className='agrupacion'>

                <h1>Filtrar búsqueda</h1>

                <hr />

                <h2>Grupo de alimento...</h2>
                <GrupoFilter setSelectedGroup={setSelectedGroup} />

                <hr />

                <h2>Categoría...</h2>
                <CategoriaFilter setSelectedGroup={setSelectedGroup} />

                <hr />
            </div>

            <div className='container'>
                <div>
                    <h1>Búsqueda de Alimentos FODMAP</h1>
                </div>

                <div>
                    <FoodBuscador setSearchTerm={setSearchTerm} />
                </div>

                <div className='legend'>
                    <FoodSearcher alimento={filteredAlimentos} />
                </div>
            </div>

        </>
    );

}
