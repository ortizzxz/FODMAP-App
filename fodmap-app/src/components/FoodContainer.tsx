import React, { useState } from 'react';
import { Alimento } from './types';
import { searchFood } from './fatSecretService';
import Modal from 'react-modal';
import { FoodDetails } from './FoodDetails';
import '../styles/scrollbarCustom.css';

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

export const FoodSearcher: React.FC<FoodSearcherProps> = ({ alimento }) => {
  const [selectedFood, setSelectedFood] = useState<Alimento | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [foodDetails, setFoodDetails] = useState<FoodDetailResponse | null>(null);

  const handleFoodClick = async (food: Alimento) => {
    setSelectedFood(food);
    try {
      const details = await searchFood(food.nombre);
      console.log('API Response:', details);
      if (details && details.foods && details.foods.food) {
        setFoodDetails(details);
        setModalIsOpen(true);
      } else {
        console.log('No se encontraron detalles para este alimento');
        // Aquí podrías mostrar un mensaje al usuario
      }
    } catch (error) {
      console.error('Error fetching food details:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFoodDetails(null);
    setSelectedFood(null);
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
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal}>Cerrar</button>
        {selectedFood && (
          <div>
            <h2>{selectedFood.nombre}</h2>
            {foodDetails && foodDetails.foods && foodDetails.foods.food.length > 0 && (
              <div>
                <h3>Información Nutricional:</h3>
                {foodDetails.foods.food.map((food, index) => (
                  <div key={index}>
                    <p>Nombre: {food.food_name}</p>
                    <p>Descripción: {food.food_description}</p>
                    <p>Calorías: {food.nutrients?.energy?.kcal || 'N/A'}</p>
                    <p>Proteínas: {food.nutrients?.protein || 'N/A'}</p>
                    <p>Grasas: {food.nutrients?.fat || 'N/A'}</p>
                    <p>Carbohidratos: {food.nutrients?.carbohydrate || 'N/A'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};