import { useState, useEffect } from 'react';
import { findAll } from '../services/foodService';
import { FoodSearcher } from './FoodContainer';
import { FoodDetails } from './FoodDetails';
import { FoodBuscador } from './FoodSearcherBar';
import { GrupoFilter } from './GroupFilter';
import { CategoriaFilter } from './CategoryFilter';
import { clearTranslationCache } from './fatSecretService';
import React from 'react';
import '../styles/backgroundCustomColor.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Asegúrate de que el modal tenga un elemento de app raíz

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
    const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true); 
    const [selectedFood, setSelectedFood] = useState<Alimento | null>(null); // Para manejar el alimento seleccionado



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

    useEffect(() => {
        getFood();
    }, []);

    useEffect(() => {
        setHasResults(filteredAlimentos.length > 0);
    }, [searchTerm, selectedGroup, selectedCategory, alimentos]);

    const handleSearchTermChange = (term: string) => {
        setSearchTerm(term);
        if (term !== ''){
            setShowWelcomeMessage(false);
        }
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const hideFilters = () => {
        setShowFilters(false);
    };

    const handleFoodClick = (alimento: Alimento) => {
        setSelectedFood(alimento);
    };

    const closeModal = () => {
        setSelectedFood(null);
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
          clearTranslationCache();
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);

    return (
        <div className="h-screen bg-[#88976c] flex flex-col font-sans overflow-hidden ">

            {/* Main Content */}
            <div className="bg-[#a2b879] lg:w-[70%]  sm:m-0 lg:m-1 md:m-1 lg:rounded-3xl mx-auto md:rounded-3xl flex flex-col flex-grow justify-between lg:p-2 md:p-2 h-full overflow-hidden">

                <div>
                    <h1 className="text-3xl font-medium text-center pb-3 text-[#54652d] mt-[10%] lg:mt-[5%] md:mt-[5%]">Búsqueda de Alimentos FODMAP</h1>
                    
                    <div className='relative mx-auto w-[95%] lg:w-[40%] md:w-[30%]  rounded-md bg-[#88976c]'>
                        <div className='flex p-1 '>
                            <div className='w-3/4 flex' onClick={hideFilters}>
                                <FoodBuscador setSearchTerm={handleSearchTermChange}/>
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
                    {showWelcomeMessage && (
                        <div className='text-[#54652d] text-center font-medium'>

                            <h2 className='text-xl mt-[20%] lg:mt-[10%] md:mt-[20%]'>
                                ¡Bienvenido al primer buscador de alimentos FODMAP en español!
                            </h2>
                            
                            <p className='text-xl ml-1 mr-2 mt-[20%] lg:mt-[5%] md:mt-[5%]'>
                            Esta herramienta ha sido creada de la mano de Aircury S.L. para ayudar a todos aquellos con 
                            dietas que requieran de la limitación de alimentos FODMAP.
                            </p>
                             
                        </div>
                    )}
                    {!showWelcomeMessage && !hasResults && (
                        <h2 className='text-2xl text-[#54652d] text-center mt-[40%] lg:mt-[10%] md:mt-[5%]'>
                            ¡Vaya! - no se han hallado resultados.
                        </h2>
                    )}
                    {hasResults && (
                        <FoodSearcher alimento={filteredAlimentos}  />
                    )}
                </div>

                {/* Footer */}
                <footer className="w-full bg-[#a2b879] text-[#54652d] text-center text-md py-1 mt-2">
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
