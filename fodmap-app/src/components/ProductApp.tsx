import React from 'react';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { findAll } from '../services/foodService';
import { FoodSearcher } from './FoodContainer';
import { FoodBuscador } from './FoodSearcherBar';
import { GrupoFilter } from './GroupFilter';
import { CategoriaFilter } from './CategoryFilter';
import { IndexFilter } from './IndexFilters';
import { clearTranslationCache } from './fatSecretService';
import { About } from './About';


{/* Interface for the 'alimento' object with its params received from the backend */ }
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
    const [hasSearched, setHasSearched] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedIndice, setSelectedIndice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    {/* async function to get the food from the backEnd */ }
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

    {/* we didnt use the normalize("NFD").replace because of the ñ character so we manually added the ´'s characters */ }
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

    {/* funcion para filtrar alimentos 
            searchTerm: food name
            selectedGroup: food group 
            selectedCategory: food category
            selectedIndice: fodmap index

            why callBack? -> cached and only recreated when a depedency changes 
    */}
    const filterAlimentos = useCallback(() => {
        return alimentos.filter((alimento) => {
            const searchMatch = !searchTerm || normalizeString(alimento.nombre.toLowerCase()).includes(normalizeString(searchTerm.toLowerCase()));
            const groupMatch = !selectedGroup || alimento.grupo === selectedGroup;
            const categoryMatch = !selectedCategory || alimento.tipo === selectedCategory;
            const indiceMatch = !selectedIndice || alimento.indice === selectedIndice;
            return searchMatch && groupMatch && categoryMatch && indiceMatch;
        });
    }, [alimentos, searchTerm, selectedGroup, selectedCategory, selectedIndice]);

    {/* filteredAlimentos use a useMemo to improve performance */ }
    const filteredAlimentos = useMemo(() => filterAlimentos(), [filterAlimentos]);

    {/* obtaining intial load of food */ }
    useEffect(() => {
        getFood();
    }, []);

    {/* if filteredAlimentos return at least 1 food haveResults equals true */ }
    useEffect(() => {
        setHasResults(filteredAlimentos.length > 0);
    }, [filteredAlimentos]);

    {/* searchTermChange*/ }
    const handleSearchTermChange = (term: string) => {
        setSearchTerm(term);
        setHasSearched(true);
    };

    {/* About Us change*/ }
    const handleAbout = () => {
        setShowAbout(!showAbout);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const hideFilters = () => {
        setShowFilters(false);
    };

    {/* cleaning translation cache beforeUnload */ }
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
        <div className="h-screen bg-[#e1e0e0] flex flex-col font-sans overflow-hidden"> {/* Background styles */}

            {/* Main container */}
            <div className="bg-[#eeeded] lg:w-[70%] border-[#54652d] sm:border-0 lg:border lg:m-1 md:m-1 rounded-none md:rounded-3xl lg:rounded-3xl 
            lg:mx-auto md:mx-auto flex flex-col flex-grow justify-between lg:p-2 md:p-2 h-full overflow-hidden">

                {!showAbout ? (
                    <div>
                        <div>
                            {/* Title and search bar  */}
                            <h1 className="text-3xl font-bold text-center pb-3 text-[#54652d] mt-[10%] lg:mt-[5%] md:mt-[5%]">Buscador TuFODMAP</h1>
                            <div className='relative mx-auto w-[95%] lg:w-[60%] md:w-[30%] rounded-md bg-[#88976c]'>
                                <div className='flex p-1'>
                                    <div className='w-4/5 flex' onClick={hideFilters}>
                                        <FoodBuscador setSearchTerm={handleSearchTermChange} />
                                    </div>

                                    {/* Button and SVG*/}
                                    <button
                                        className='w-1/5 text-main text-lg transition duration-100 hover:border-main focus:border-main
                                flex items-center justify-center relative overflow-hidden
                                active:translate-y-[2px] active:shadow-inner'
                                        onClick={toggleFilters}
                                        aria-label='Filtrar resultados'
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Filters  */}
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
                        </div>

                        {/* Food Cointainter that either shows Food or a message */}
                        <div className='w-full flex flex-col flex-grow items-center justify-center overflow-auto scrollbar-none ml-1' onClick={hideFilters}>
                            <div className='w-full flex flex-col flex-grow items-center justify-center overflow-auto scrollbar-none ml-1' onClick={hideFilters}>

                                {/*Whole logic: Hasn't searched ? Show initial message. Has searched ?  
                                                                              ( Is searchBar empty ? Try to type sum :
                                                                                Has results ? Show results of the search : 
                                                                                Hasn't results ? Show no results found messsage
                        */}
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
                                ) : searchTerm.trim() === '' ? ( // .trim() checks for white spaces on the searchTerm. if its all empty equals true
                                    <h2 className='text-2xl text-[#54652d] text-center'>Prueba a escribir algo en el buscador...</h2>
                                ) : hasResults ? (
                                    <FoodSearcher alimento={filteredAlimentos} />
                                ) : (
                                    <h2 className='text-2xl text-[#54652d] text-center'>¡Vaya! No se han hallado resultados.</h2>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center ">
                        <div className="p-6 rounded-lg max-w-2xl w-full mx-4">
                            <About />
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="w-full bg-[#eeeded] text-[#54652d] text-center text-md py-1 mt-2">
                    <a href="https://github.com/ortizzxz/FODMAP-App/" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-third transition duration-300">
                        GitHub
                    </a>
                    <a href="https://www.aircury.com" target="_blank" rel="noopener noreferrer" className="mx-2 hover:text-third transition duration-300">
                        Aircury
                    </a>
                    <a href="#" onClick={handleAbout} className='mx-2 hover:text-third transition duration-300'>
                        Acerca de
                    </a>
                </footer>
            </div>
        </div>
    );
};