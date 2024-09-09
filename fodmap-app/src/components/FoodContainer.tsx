import React, { useState, useEffect } from 'react';
import { Alimento } from './types';
import { searchFood, translateText, searchImage } from './fatSecretService';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Modal from 'react-modal';

import '../styles/scrollbarCustom.css';
import '../styles/modal.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

{/* Interface for the responde of FatSecret API so we can display data based on fetched info */}
interface FoodDetailResponse {
  food_name: string;
  food_description: string;
  servings?: {
    serving?: {
      serving_description: string;
      calories: string;
      protein: string;
      fat: string;
      carbohydrate: string;
    };
  };
  imageUrl?: string; // added for the img 
}

{/* Props for the foodSearcher */}
interface FoodSearcherProps {
  alimento: Alimento[];
}

Modal.setAppElement('#root'); 

{/* funciont to Capitalize first letter of an array used on index level of fodmap */}
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

{/* Main function */}
export const FoodSearcher: React.FC<FoodSearcherProps> = ({ alimento }) => {
  const [selectedFood, setSelectedFood] = useState<Alimento | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [foodDetails, setFoodDetails] = useState<FoodDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFoodClick = async (food: Alimento) => {
    setSelectedFood(food);
    setIsLoading(true);
    setError(null);
  
    try {
      const translatedName = await translateText(food.nombre, 'en');
      const detailsPromise = searchFood(translatedName).catch((error) => {
        console.error('Error fetching food details:', error);
        return null;
      });
      
      const details = await detailsPromise;
      
      setFoodDetails({
        food_name: food.nombre,
        food_description: details?.foods?.food?.food_description || 'No hay información nutricional disponible.',
        servings: details?.foods?.food?.servings?.serving,
        imageUrl: food.previewImageUrl 
      });
    } catch (error) {
      console.error('Error processing request:', error);
      setError('Error al procesar la solicitud');
    } finally {
      setIsLoading(false);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFoodDetails(null);
    setSelectedFood(null);
    setError(null);
  };
  
  // function to get border color changed based on the fodmap indice 
  const getBorderByIndex = (indice: string) => {
    switch(indice.toLowerCase()){
      case 'alto': 
        return 'border-[#f57676]'
      case 'medio': 
        return 'border-[#f8fa7a]'
      case 'bajo': 
        return 'border-[#7bfc90]'
      default: 
        return 'border-[#cee696]'
    }
  };

  return (
    <div className="h-full w-full overflow-auto mt-[2%] ml-2 mr-1 scroll-container ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-4 overflow-auto">
        {alimento.map((food) => (
          <div
            key={food.nombre}
            onClick={() => handleFoodClick(food)}
            className={`justify-center cursor-pointer border-2 bg-[#EAEFE0] rounded-md w-[95%] p-4 m-2 text-center shadow-md ${getBorderByIndex(food.indice)}`}
          >
            <div className='text-xl'>{capitalizeFirstLetter(food.nombre)}</div>   
            <div className='text-lg'>Indice FODMAP: {capitalizeFirstLetter(food.indice)}</div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Food Details Modal"
        className="modal-content flex flex-col justify-center items-center p-4"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="w-[70%] mb-2 px-4 py-2 font-[500] bg-[#b5ce88] text-main rounded-md hover:border-main hover:bg-opacity-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-second focus:ring-opacity-50">
          Cerrar
        </button>
        {isLoading && <p>Cargando...</p>}
        {error && <p className="error text-lg text-center">Servidor en mantenimiento. <br /> Inténtelo nuevamente más tarde.</p>}
        {foodDetails && !isLoading && !error && (
          <div className="flex flex-col items-center">
            {foodDetails.imageUrl && (
              <div className='w-full h-80 bg-gray-300 flex justify-center items-center'>
                <LazyLoadImage
                  src={foodDetails.imageUrl}
                  alt={foodDetails.food_name}
                  effect="blur"
                  className="block min-w-full w-full max-w-full max-h-80 h-auto rounded-lg" 
                />
              </div>
            )}
            <h2 className='text-2xl text-center font-[500] text-[#54652d] '>{foodDetails.food_name}</h2>
            <h2 className='text-xl text-centeñr font-[500] text-[#54652d]'>Indice FODMAP: {capitalizeFirstLetter(selectedFood?.indice || '')}</h2>
            <p className='text-center text-lg'>{foodDetails.food_description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};