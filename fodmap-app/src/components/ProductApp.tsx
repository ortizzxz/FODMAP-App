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
    const [hasSearched, setHasSearched] = useState(false);



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
        // Reemplazar los caracteres acentuados manualmente
        return str
            .replace(/[áàäâã]/g, "a")
            .replace(/[éèëê]/g, "e")
            .replace(/[íìïî]/g, "i")
            .replace(/[óòöôõ]/g, "o")
            .replace(/[úùüû]/g, "u")
            .replace(/[ÁÀÄÂÃ]/g, "A")
            .replace(/[ÉÈËÊ]/g, "E")
            .replace(/[ÍÌÏÎ]/g, "I")
            .replace(/[ÓÒÖÔÕ]/g, "O")
            .replace(/[ÚÙÜÛ]/g, "U");
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
        setHasSearched(true);
        if (term !== '') {
            setShowWelcomeMessage(false);
        }
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const hideFilters = () => {
        setShowFilters(false);
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
        <div className="h-screen bg-[#e1e0e0] flex flex-col font-sans overflow-hidden ">

            {/* Main Content */}
            <div className="bg-[#eeeded] lg:w-[70%]  border-[#54652d] sm:border-0 lg:border lg:m-1 md:m-1 rounded-none md:rounded-3xl lg:rounded-3xl 
            lg:mx-auto md:mx-auto flex flex-col flex-grow justify-between lg:p-2 md:p-2 h-full overflow-hidden">

                <div>
                    <h1 className="text-3xl font-bold text-center pb-3 text-[#54652d] mt-[10%] lg:mt-[5%] md:mt-[5%]">Buscador TuFODMAP</h1>

                    <div className='relative mx-auto w-[95%] lg:w-[50%] md:w-[30%]  rounded-md bg-[#88976c]'>
                        <div className='flex p-1 '>
                            <div className='w-3/4 flex' onClick={hideFilters}>
                                <FoodBuscador setSearchTerm={handleSearchTermChange} />
                            </div>
                            <button
                                className='w-1/4 text-main text-lg transition duration-100 hover:border-main focus:border-main
                                flex items-center justify-center relative overflow-hidden
                                active:translate-y-[2px] active:shadow-inner'
                                onClick={toggleFilters}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        {showFilters && (

                            <div className='flex justify-between space-x-2 w-full bg-[#eeeded]'>
                            <div className='flex-1 mt-1 bg-[#88976c] rounded-md p-2'>
                                <GrupoFilter setSelectedGroup={setSelectedGroup} />
                            </div>
                            
                            <div className='flex-1 mt-1 bg-[#88976c] rounded-md p-2'>
                                <CategoriaFilter setSelectedCategory={setSelectedCategory} />
                            </div>
                            
                            <div className='flex-1 mt-1 bg-[#88976c] rounded-md p-2'>
                                <CategoriaFilter setSelectedCategory={setSelectedCategory} />
                            </div>
                        </div>
                        )}
                    </div>

                </div>

                <div className='w-full flex flex-col flex-grow items-center justify-center overflow-auto scrollbar-none ml-1' onClick={hideFilters}>
                    {showWelcomeMessage && (
                        <div className='text-[#54652d] text-center font-medium max-w-2xl w-[80%]'>
                            <h2 className='text-xl mb-4'>
                                ¡Bienvenido al primer buscador de alimentos FODMAP en español!
                            </h2>
                            <p className='text-xl'>
                                Esta herramienta ha sido creada para ayudar a todos aquellos con
                                dietas que requieran de la limitación de alimentos FODMAP.
                            </p>
                        </div>
                    )}
                    {!showWelcomeMessage && !hasResults && searchTerm && (
                        <h2 className='text-2xl text-[#54652d] text-center'>
                            ¡Vaya! - no se han hallado resultados.
                        </h2>
                    )}
                    {hasResults && (
                        <FoodSearcher alimento={filteredAlimentos} />
                    )}
                    {!hasResults && !searchTerm && hasSearched && (
                        <h2 className='text-2xl text-[#54652d] text-center'>
                            Prueba a escribir algo en el buscador...
                        </h2>
                    )}
                </div>

                {/* Footer */}
                <footer className="w-full bg-[#eeeded] text-[#54652d] text-center text-md py-1 mt-2">
                    <a href="https://github.com/ortizzxz/FODMAP-App/" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-third transition duration-300">
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
