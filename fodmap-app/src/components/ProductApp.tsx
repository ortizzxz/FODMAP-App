import { useState, useEffect, useMemo, useCallback } from 'react';
import { findAll } from '../services/foodService';
import { FoodSearcher } from './FoodContainer';
import { FoodBuscador } from './FoodSearcherBar';
import { GrupoFilter } from './GroupFilter';
import { CategoriaFilter } from './CategoryFilter';
import { IndexFilter } from './IndexFilters';
import RecipesSection from './RecipesSection';
import { clearTranslationCache } from './fatSecretService';
import React from 'react';
import '../styles/backgroundCustomColor.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface Alimento {
    nombre: string;
    tipo: string;
    grupo: string;
    indice: string;
}

export const ProductApp: React.FC = () => {
    const [alimentos, setAlimentos] = useState<Alimento[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [hasResults, setHasResults] = useState(false);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedIndice, setSelectedIndice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showRecipeSection, setShowRecipeSection] = useState(false);

    const toggleRecipeSection = () => {
        setShowRecipeSection(!showRecipeSection);
    };

    const getFood = async () => {
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

    const filterAlimentos = useCallback(() => {
        return alimentos.filter((alimento) => {
            const searchMatch = !searchTerm || normalizeString(alimento.nombre.toLowerCase()).includes(normalizeString(searchTerm.toLowerCase()));
            const groupMatch = !selectedGroup || alimento.grupo === selectedGroup;
            const categoryMatch = !selectedCategory || alimento.tipo === selectedCategory;
            const indiceMatch = !selectedIndice || alimento.indice === selectedIndice;
            return searchMatch && groupMatch && categoryMatch && indiceMatch;
        });
    }, [alimentos, searchTerm, selectedGroup, selectedCategory, selectedIndice]);

    const filteredAlimentos = useMemo(() => filterAlimentos(), [filterAlimentos]);

    useEffect(() => {
        getFood();
    }, []);

    useEffect(() => {
        setHasResults(filteredAlimentos.length > 0);
    }, [filteredAlimentos]);

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
        <div className="h-screen bg-[#e1e0e0] flex flex-col font-sans overflow-hidden">
            
            {/*MAIN DIV*/}
            <div className="bg-[#eeeded] lg:w-[70%] border-[#54652d] sm:border-0 lg:border lg:m-1 md:m-1 rounded-none md:rounded-3xl lg:rounded-3xl 
            lg:mx-auto md:mx-auto flex flex-col flex-grow justify-between lg:p-2 md:p-2 h-full overflow-hidden">
                <div>
                    
                    {/*HEADER*/}
                    <div className='flex justify-center mt-[10%] lg:mt-[5%] md:mt-[5%]'>
                        <h1 className="text-3xl font-bold text-center pb-3 text-[#54652d] mr-4">
                            {showRecipeSection ? 'Recetario TuFODMAP' : 'Buscador TuFODMAP'}
                        </h1>
                        
                        <button 
                            onClick={toggleRecipeSection}
                            className='lg:block hidden b-1 border-main text-center w-fit  h-fit p-1 justify-center text-xl text-black
                                       hover:bg-[#e1e0e0] hover:border-main active:translate-y-[2px] active:shadow-inner'>
                                {showRecipeSection ? 'Buscador' : 'Recetario'}
                        </button>
                    </div>

                    {/*SEARCHING BAR*/}
                    {!showRecipeSection && ( 
                    <div className='relative mx-auto w-[95%] lg:w-[60%] md:w-[30%] rounded-md bg-[#88976c]'>
                        <div className='flex p-1'>
                            <div className='w-4/5 flex' onClick={hideFilters}>
                                <FoodBuscador setSearchTerm={handleSearchTermChange} />
                            </div>
                            <button
                                className='w-1/5 text-main text-lg transition duration-100 hover:border-main focus:border-main
                                flex items-center justify-center relative overflow-hidden
                                active:translate-y-[2px] active:shadow-inner'
                                onClick={toggleFilters}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                                    <IndexFilter setSelectedIndice={setSelectedIndice} />
                                </div>
                            </div>
                        )}
                    </div>
                    )}
                </div>

                {/*LANDING TEXT*/}
                {!showRecipeSection && ( 
                <div className='w-full flex flex-col flex-grow items-center justify-center overflow-auto scrollbar-none ml-1' onClick={hideFilters}>
                    <div className='w-full flex flex-col flex-grow items-center justify-center overflow-auto scrollbar-none ml-1' onClick={hideFilters}>
                        {!hasSearched ? (
                            <div className='text-[#54652d] text-center font-medium max-w-2xl w-[80%]'>
                                <h2 className='text-xl mb-4'>
                                    ¡Bienvenido al primer buscador de alimentos FODMAP en español!
                                </h2>
                                <p className='text-xl'>
                                    Esta herramienta ha sido creada para ayudar a todos aquellos con
                                    dietas que requieran de la limitación de alimentos FODMAP.
                                </p>
                            </div>
                        ) : hasResults ? (
                            <FoodSearcher alimento={filteredAlimentos} />
                        ) : (
                            <h2 className='text-2xl text-[#54652d] text-center'>
                                {searchTerm || selectedGroup || selectedCategory || selectedIndice
                                    ? '¡Vaya! - no se han hallado resultados.'
                                    : 'Prueba a escribir algo en el buscador...'}
                            </h2>
                        )}
                    </div>
                </div>
                )}

                {showRecipeSection && (
                    <div className='flex  overflow-auto scrollbar-none'>
                        <RecipesSection />
                    </div>
                )}


                {/*RECETARIO*/}

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