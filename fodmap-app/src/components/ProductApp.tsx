import { useState } from 'react';
import { findAll } from '../services/foodService';
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
        <div className="min-h-screen flex bg-gray-50 font-sans">

        <div className="mt-16 ml-6 mr-8 mb-16 w-1/5  border-2 border-gray-100 rounded-lg shadow-2xl bg-white p-6">


                <h1 className='text-2xl text-center mb-2'>Filtrar búsqueda</h1>

                <hr />

                <h2>Grupo de alimento...</h2>
                <GrupoFilter setSelectedGroup={setSelectedGroup} />

                <hr />

                <h2>Categoría...</h2>
                <CategoriaFilter setSelectedGroup={setSelectedGroup} />

                <hr />
            </div>

            <div className="mt-16 ml-6 mr-8 mb-16 w-4/6 border-2 border-gray-100 rounded-lg shadow-2xl bg-white">
                <div>
                    <h1>Búsqueda de Alimentos FODMAP</h1>
                </div>

                <div>
                    <FoodBuscador setSearchTerm={setSearchTerm} />
                </div>

                <div>
                    <FoodSearcher alimento={filteredAlimentos} />
                </div>
            </div>
        </div>
        </>
    );

}
