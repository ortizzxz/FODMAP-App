import { useState, useEffect } from 'react';
import { findAll } from '../services/foodService';
import { FoodSearcher } from './FoodContainer';
import { FoodBuscador } from './FoodSearcherBar';
import { GrupoFilter } from './GroupFilter';
import { CategoriaFilter } from './CategoryFilter';
import React from 'react';
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
    const [hasResults, setHasResults] = useState<boolean>(false); 

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

    const filteredAlimentos = searchTerm
        ? alimentos.filter(alimento =>
            normalizeString(alimento.nombre.toLowerCase()).includes(normalizeString(searchTerm.toLowerCase())) &&
            (selectedGroup === '' || alimento.grupo.toLowerCase() === selectedGroup.toLowerCase()) &&
            (selectedCategory === '' || alimento.tipo.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(alimento.tipo.toLowerCase()))
        )
        : [];

        
        const toggleFilters = () => {
            setShowFilters(!showFilters);
        };
        
        const hideFilters = () => {
            setShowFilters(false);
        };
        
        useEffect(() => {
            getFood();
        }, []);
    
        useEffect(() => {
            setHasResults(filteredAlimentos.length > 0);
        }, [searchTerm, selectedGroup, selectedCategory, alimentos]);
        
    return (
        <div className="h-screen bg-[#272222] flex flex-col font-sans overflow-hidden">

            {/* Main Content */}
            <div className="bg-main sm:m-0 lg:m-1 md:m-1 lg:rounded-3xl md:rounded-3xl flex flex-col flex-grow justify-between lg:p-2 md:p-2 h-full overflow-hidden">

                <div>
                    <h1 className="text-3xl text-center pb-3 text-second mt-[10%] lg:mt-[5%] md:mt-[5%]">Búsqueda de Alimentos FODMAP</h1>
                    
                    <div className='relative mx-auto w-[95%] lg:w-[30%] md:w-[30%]  rounded-md bg-third'>
                        <div className='flex p-1 '>
                            <div className='w-3/4 flex' onClick={hideFilters}>
                                <FoodBuscador setSearchTerm={setSearchTerm}/>
                            </div>
                            <button 
                                className='w-1/4 text-main text-lg transition duration-300 hover:border-main focus:border-main focus-within:bg-[#a59e95] active:bg-[#af9987]'
                                onClick={toggleFilters}
                            >
                                Filtros
                            </button>
                        </div>
                        {showFilters && (
                            <div className="bg-third border-1 rounded absolute lg:top-[-120%] lg:left-[100%] md:top-[-120%] md:left-[100%] w-1/2 ml-2 mt-2 p-4 shadow-lg transition-transform duration-1000 transform scale-100">
                                <h2 className="text-xl mb-2 text-center custom-text">Grupo de alimento</h2>
                                <GrupoFilter setSelectedGroup={setSelectedGroup} />
                                <h2 className="text-xl mt-4 mb-2 text-center custom-text">Categoría</h2>
                                <CategoriaFilter setSelectedCategory={setSelectedCategory} />
                            </div>
                        )}
                    </div>
                    
                </div>

                <div className='w-full flex-grow overflow-auto scrollbar-none' onClick={hideFilters}>
                    {hasResults ? ( 
                        <FoodSearcher alimento={filteredAlimentos} />
                    ) : (
                        <h2 className='text-xl text-second text-center mt-[40%] lg:mt-[5%] md:mt-[5%]'>¡Vaya! - no se han hallado resultados. <br /> Prueba a escribir en el buscador...</h2>
                    )}
                </div>

                {/* Footer */}
                <footer className="w-full bg-main text-second text-center py-1 mt-2 text-sm">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-third transition duration-300">
                        GitHub
                    </a>
                    <a href="https://www.aircury.com" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-third transition duration-300">
                        Aircury
                    </a>
                </footer>

            </div>

        </div>
    );
};
