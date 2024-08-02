import React, { useState } from 'react';
import { Alimento } from './types';
import { searchFood } from './fatSecretService';
import Modal from 'react-modal';
import { FoodDetails } from './FoodDetails';
import '../styles/scrollbarCustom.css';
import { translateText

 } from './fatSecretService';
interface NutritionalInfo {
  energy?: {
    kcal?: string;
  };
  protein?: string;
  fat?: string;
  carbohydrate?: string;
}

interface FoodDetailResponse {
  foods: {
    food: {
      nutrients?: NutritionalInfo;
      food_name: string;
      food_description: string;
    }[];
  };
}

interface FoodSearcherProps {
  alimento: Alimento[];
}

Modal.setAppElement('#root'); // Asegúrate de que esto esté configurado para evitar problemas de accesibilidad

export const FoodSearcher: React.FC<FoodSearcherProps> = ({ alimento }) => {
  const [selectedFood, setSelectedFood] = useState<Alimento | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [foodDetails, setFoodDetails] = useState<any | null>(null);
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
      if (details && details.foods && details.foods.food && details.foods.food.length > 0) {
        const filteredFood = details.foods.food[0];
        setFoodDetails(filteredFood);
      } else {
        setError('No se encontraron detalles para este alimento');
        setFoodDetails(null);
      }
    } catch (error) {
      console.error('Error fetching food details:', error);
      setError('Error al buscar detalles del alimento');
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
            className="flex justify-center cursor-pointer"
          >
            <FoodDetails alimento={food} />
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Food Details Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal}>Cerrar</button>
        {isLoading && <p>Cargando...</p>}
        {error && <p className="error">{error}</p>}
        {selectedFood && foodDetails && !isLoading && !error && (
          <div>
            <h2>{selectedFood.nombre}</h2>
            <div>
              <h3>Información Nutricional:</h3>
              <p>Nombre: {foodDetails.food_name}</p>
              <p>Descripción: {foodDetails.food_description}</p>
              <p>Calorías: {foodDetails.nutrients?.energy?.kcal || 'N/A'}</p>
              <p>Proteínas: {foodDetails.nutrients?.protein || 'N/A'}</p>
              <p>Grasas: {foodDetails.nutrients?.fat || 'N/A'}</p>
              <p>Carbohidratos: {foodDetails.nutrients?.carbohydrate || 'N/A'}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
