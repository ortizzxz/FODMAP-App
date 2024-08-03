import React, { useState } from 'react';
import { Alimento } from './types';
import { searchFood, translateText } from './fatSecretService';
import Modal from 'react-modal';
import '../styles/scrollbarCustom.css';
import '../styles/modal.css'

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
    }
  };
}

interface FoodSearcherProps {
  alimento: Alimento[];
}

Modal.setAppElement('#root'); // Asegúrate de que esto esté configurado para evitar problemas de accesibilidad

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

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
      console.log('Searching for:', food.nombre);
      const translatedName = await translateText(food.nombre, 'en');
      console.log('Translated name:', translatedName);
      const details = await searchFood(translatedName);
      console.log('API Response in component:', details);
      setFoodDetails(details);
    } catch (error) {
      console.error('Error fetching food details:', error);
      setError(error instanceof Error ? error.message : 'Error al buscar detalles del alimento');
      setFoodDetails(null);
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

  return (
    <div className="h-full overflow-auto mt-[2%] ml-2 mr-1 scroll-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-4 overflow-auto">
        {alimento.map((food) => (
          <div
            key={food.nombre}
            onClick={() => handleFoodClick(food)}
            className=" justify-center cursor-pointer border-1 border-second bg-third rounded-md w-[95%] p-4 m-2 text-center shadow-xl"
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
        className="modal-content flex justify-center items-center"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="w-[50%] mb-4 px-4 py-2 bg-third text-main rounded-md hover:border-main hover:bg-opacity-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-second focus:ring-opacity-50">Cerrar</button>
        {isLoading && <p>Cargando...</p>}
        {error && <p className="error">{error}</p>}
        {foodDetails && !isLoading && !error && (
          <div>
            <h2>{foodDetails.food_name}</h2>
            <p>{foodDetails.food_description}</p>
            <div>
              <h3>Información Nutricional:</h3>
              {foodDetails.servings?.serving ? (
                <div>
                  <p>Tamaño de porción: {foodDetails.servings.serving.serving_description}</p>
                  <p>Calorías: {foodDetails.servings.serving.calories}</p>
                  <p>Proteínas: {foodDetails.servings.serving.protein}g</p>
                  <p>Grasas: {foodDetails.servings.serving.fat}g</p>
                  <p>Carbohidratos: {foodDetails.servings.serving.carbohydrate}g</p>
                </div>
              ) : (
                <p>No hay información nutricional disponible.</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};