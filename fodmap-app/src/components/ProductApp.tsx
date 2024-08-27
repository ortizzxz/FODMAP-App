import { useState, useEffect, useMemo, useCallback } from 'react';
import { findAll } from '../services/foodService';
import { FoodSearcher } from './FoodContainer';
import { FoodBuscador } from './FoodSearcherBar';
import { GrupoFilter } from './GroupFilter';
import { CategoriaFilter } from './CategoryFilter';
import { IndexFilter } from './IndexFilters';
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
            <div className="bg-[#eeeded] lg:w-[70%] border-[#54652d] sm:border-0 lg:border lg:m-1 md:m-1 rounded-none md:rounded-3xl lg:rounded-3xl 
            lg:mx-auto md:mx-auto flex flex-col flex-grow justify-between lg:p-2 md:p-2 h-full overflow-hidden">
                <div>
                    <h1 className="text-3xl font-bold text-center pb-3 text-[#54652d] mt-[10%] lg:mt-[5%] md:mt-[5%]">Buscador TuFODMAP</h1>
                    <div className='relative mx-auto w-[95%] lg:w-[40%] md:w-[30%] rounded-md bg-[#88976c]'>
                        <div className='flex p-1'>
                            <div className='w-3/4 flex' onClick={hideFilters}>
                                <FoodBuscador setSearchTerm={handleSearchTermChange} />
                            </div>
                            <button
                                className='w-1/4 text-main text-lg transition duration-300 hover:border-main focus:border-main focus-within:bg-[#a59e95] active:bg-[#af9987]'
                                onClick={toggleFilters}
                            >
                                Filtros
                            </button>
                        </div>
                        {showFilters && (
                            <div className="bg-[#88976c] border-1 rounded absolute lg:top-[80%] lg:left-[-2%] md:top-[-120%] md:left-[100%] w-full
                    ml-2 mt-2 p-4 shadow-lg transition-transform duration-1000 transform scale-100">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-xl text-center custom-text flex-grow">Grupo de alimento</h2>
                                    <button
                                        onClick={hideFilters}
                                        className='w-8 h-8 text-center border-1 border-black hover:bg-[#e1e0e0] transition-colors duration-500 ml-2'>
                                        X
                                    </button>
                                </div>
                                <GrupoFilter setSelectedGroup={setSelectedGroup} />
                                <h2 className="text-xl mt-4 mb-2 text-center custom-text">Categoría</h2>
                                <CategoriaFilter setSelectedCategory={setSelectedCategory} />
                                <h2 className="text-xl mt-4 mb-2 text-center custom-text">Índice FODMAP</h2>
                                <IndexFilter setSelectedIndice={setSelectedIndice} />
                            </div>
                        )}
                    </div>
                </div>

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