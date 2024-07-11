import { useState } from 'react';
import { findAll } from '../services/foodService';
import '../styles/App.css'
import '../styles/legendStyle.css'
import { FoodSearcher } from './FoodSearcher'
import { useEffect } from 'react';
import { FoodBuscador } from './FoodBuscador';
import { GrupoFilter } from './GrupoFilter';
import { CategoriaFilter } from './CategoriaFilter';
import React from 'react';

export const ProductApp: React.FC = () => {

                                                       /* Interface */ 

    interface Alimento {
        nombre: string;
        grupo: string;
        indice: string;
    }

    interface ApiResponse {
        _embedded: {
            alimentoes: Alimento[];
        };
    }

                                                        /*  CONST   */

    const [alimentos, setAlimentos] = useState<Alimento[]>([]); // from jsx to tsx useState<Alimento[]> 
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGroup, setSelectedGroup] = useState<string>('');

    
    const getFood = async (): Promise<void> => {

        const result = await findAll();

        if (result && result.data._embedded) {
            
            console.log(result.data._embedded.alimentoes); // Verifica la estructura de los datos
            setAlimentos(result.data._embedded.alimentoes); // nombre de la tabla, no de la entidad.
        }

    }
    
    const normalizeString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    
    const filteredAlimentos = alimentos.filter(alimento =>
    normalizeString(alimento.nombre.toLowerCase()).includes(normalizeString(searchTerm.toLowerCase())) &&
        (selectedGroup === '' || alimento.grupo.toLowerCase() === selectedGroup.toLocaleLowerCase())
    );

    useEffect(() => {
        getFood();
    }, []);

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
