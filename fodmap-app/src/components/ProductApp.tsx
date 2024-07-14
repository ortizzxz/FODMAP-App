import { useState, useEffect } from 'react';
import { findAll } from '../services/foodService';
import { FoodSearcher } from './FoodContainer';
import { FoodBuscador } from './FoodSearcherBar';
import { GrupoFilter } from './GroupFilter';
import { CategoriaFilter } from './CategoriaFilter';
import React from 'react';
import '../styles/heightCustom.css'


interface Alimento {
    nombre: string;
    grupo: string;
    indice: string;
}

export const ProductApp: React.FC = () => {
    const [alimentos, setAlimentos] = useState<Alimento[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGroup, setSelectedGroup] = useState<string>('');

    const getFood = async (): Promise<void> => {
        try {
            const result = await findAll();

            if (result && result.data._embedded) {
                setAlimentos(result.data._embedded.alimentoes);
            }
        } catch (error) {
            console.error('Error fetching food:', error);
        }
    };

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
        <div className="h-screen flex flex-col sm:flex-row bg-gray-50 font-sans">

            {/* Sidebar */}
            <div className="lg:block hidden lg:altura lg:w-1/5 mt-16 ml-6 mr-8 mb-16 border-2 border-gray-100 rounded-lg shadow-2xl bg-white p-6 overflow-hidden">
                <h1 className="text-2xl text-center mb-2">Filtrar búsqueda</h1>

                <hr className='m-3 object-center w-34'/>

                <h2 className="text-xl text-center p-2">Grupo de alimento</h2>
                <GrupoFilter setSelectedGroup={setSelectedGroup} />

                <hr className='m-3 object-center w-34'/>

                <h2 className="text-xl text-center p-2">Categoría</h2>
                <CategoriaFilter setSelectedGroup={setSelectedGroup} />

            </div>

            {/* Main Content */}
            <div className="lg:altura lg:w-4/6 mt-16 ml-6 mr-8 mb-16 border-2 border-gray-100 rounded-lg shadow-2xl bg-white p-6 overflow-hidden">
                <h1 className="text-2xl text-center pb-2">Búsqueda de Alimentos FODMAP</h1>
                <div>
                    <FoodBuscador setSearchTerm={setSearchTerm} />
                </div>
                <div>
                    <FoodSearcher alimento={filteredAlimentos} />
                </div>
            </div>

            {/* RIGHT BAR KINDA FOOTER */}
            <div className='hidden lg:block lg:w-1/12 mt-20 pr-6'>
                <div>   
                    <a href="https://www.aircury.es/" target='_blank'>
                        <img src="https://th.bing.com/th/id/OIP.Qg_2fCOXKEJKOQyYyzrJJwAAAA?rs=1&pid=ImgDetMain" alt="Aircury LTD" />
                    </a>
                </div>
                
                <div>   
                    <a href="https://github.com/ortizzxz/FODMAP-App" target='_blank'>
                        <img src="/imgs/GitHub_Logo.png" alt="GitHub" className='mt-4'/>
                    </a>
                </div>
            </div>

        </div>
    );
};
