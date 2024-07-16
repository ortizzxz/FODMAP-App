import { useState, useEffect } from 'react';
import { findAll } from '../services/foodService';
import { FoodSearcher } from './FoodContainer';
import { FoodBuscador } from './FoodSearcherBar';
import { GrupoFilter } from './GroupFilter';
import { CategoriaFilter } from './CategoryFilter';
import React from 'react';
import '../styles/heightCustom.css';
import '../styles/backgroundCustomColor.css';

interface Alimento {
    nombre: string;
    tipo: string;
    grupo: string;
    indice: string;
}

export const ProductApp: React.FC = () => {
    const [alimentos, setAlimentos] = useState<Alimento[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedGroup, setSelectedGroup] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [showFilters, setShowFilters] = useState<boolean>(false);

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
        (selectedGroup === '' || alimento.grupo.toLowerCase() === selectedGroup.toLowerCase()) &&
        (selectedCategory === '' || alimento.tipo.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(alimento.tipo.toLowerCase()))
    );

    useEffect(() => {
        getFood();
    }, []);

    useEffect(() => {
        console.log('Categoria: ', selectedCategory);
    }, [selectedGroup, selectedCategory, alimentos]);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="h-screen flex flex-col sm:flex-row custom-body-background font-sans">
            {/* Sidebar */}
            <div className="hidden lg:altura lg:w-1/5 mt-16 ml-6 mr-8 mb-16 border-2 border-gray-100 rounded-lg shadow-2xl bg-white p-6 overflow-hidden">
                <h1 className="text-2xl text-center mb-2">Filtrar búsqueda</h1>
                <hr className='m-3 object-center w-34'/>
                <h2 className="text-xl text-center p-2">Grupo de alimento</h2>
                <GrupoFilter setSelectedGroup={setSelectedGroup} />
                <hr className='m-3 object-center w-34'/>
                <h2 className="text-xl text-center p-2">Categoría</h2>
                <CategoriaFilter setSelectedCategory={setSelectedCategory} />
            </div>

            {/* Main Content */}
            <div className="custom-background m-2 w-full flex-col relative">
                <div className='mt-[10%]'>
                    <h1 className="text-3xl text-center pb-3 custom-text-dark">Búsqueda de Alimentos FODMAP</h1>
                    <div className='relative ml-[35%] w-[30%] rounded-md custom-searchbar-background'>
                        <div className='flex p-1'>
                            <div className='w-3/4 flex'>
                                <FoodBuscador setSearchTerm={setSearchTerm}/>
                            </div>
                            <button 
                                className='w-1/4 custom-text-light custom-border-light block border-1'
                                onClick={toggleFilters}
                            >
                                Filtros
                            </button>
                        </div>
                        {showFilters && (
                            <div className="custom-border-light custom-body-background border-1 rounded absolute top-[65%] left-[47%] w-1/2 ml-2 mt-2 p-4 shadow-lg z-10">
                                <h2 className="text-xl mb-2 text-center custom-text">Grupo de alimento</h2>
                                <GrupoFilter setSelectedGroup={setSelectedGroup} />
                                <h2 className="text-xl mt-4 mb-2 text-center custom-text">Categoría</h2>
                                <CategoriaFilter setSelectedCategory={setSelectedCategory} />
                            </div>
                        )}
                    </div>
                </div>
                <div className='w-full'>
                    <FoodSearcher alimento={filteredAlimentos} />
                </div>
            </div>

            {/* RIGHT BAR KINDA FOOTER */}
            <div className='hidden lg:w-1/12 mt-20 pr-6'>
                <div>   
                    <a href="https://www.aircury.es/" target='_blank'>
                        <img src="https://th.bing.com/th/id/OIP.Qg_2fCOXKEJKOQyYyzrJJwAAAA?rs=1&pid=ImgDetMain" alt="Aircury LTD" className='h-auto max-h-12 mx-auto' />
                    </a>
                </div>
                <div className='mt-4'>   
                    <a href="https://github.com/ortizzxz/FODMAP-App" target='_blank'>
                        <img src="/imgs/GitHub_Logo.png" alt="GitHub" className='h-auto max-h-12 mx-auto'/>
                    </a>
                </div>
            </div>

            {/* Bottom bar for mobile screens */}
            <div className='lg:hidden md:hidden h-12 w-full flex justify-center items-center'>
                <div className="flex justify-center items-center w-1/2 p-4 h-full">   
                    <a href="https://www.aircury.es/" target='_blank'> 
                        <img src="https://th.bing.com/th/id/OIP.Qg_2fCOXKEJKOQyYyzrJJwAAAA?rs=1&pid=ImgDetMain" alt="Aircury LTD" className='h-full max-h-full object-contain' />
                    </a>
                </div>
                <div className="flex justify-center items-center w-1/2 p-4 h-full">   
                    <a href="https://github.com/ortizzxz/FODMAP-App" target='_blank'>
                        <img src="/imgs/GitHub_Logo.png" alt="GitHub" className='h-full max-h-full object-contain'/>
                    </a>
                </div>
            </div>
        </div>
    );
};
