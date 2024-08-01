import React, { useState } from 'react';
import { Alimento } from './types';
import { searchFood } from './fatSecretService';
import Modal from 'react-modal';
import { FoodDetails } from './FoodDetails';
import '../styles/scrollbarCustom.css';
import '../styles/modal.css';

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

  const handleFoodClick = async (food: Alimento) => {
    setSelectedFood(food);
    try {
      const details = await searchFood(food.nombre);
      console.log('API Response:', details);
      if (details && details.foods && details.foods.food) {
        const filteredFood = details.foods.food.find((item: any) => item.food_name.toLowerCase() === food.nombre.toLowerCase());
        if (filteredFood) {
          setFoodDetails(filteredFood);
        } else {
          console.log('No se encontraron detalles para este alimento');
          setFoodDetails(null);
        }
        setModalIsOpen(true);
      } else {
        console.log('No se encontraron detalles para este alimento');
        setFoodDetails(null);
      }
    } catch (error) {
      console.error('Error fetching food details:', error);
      setFoodDetails(null);
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
        className="modal-content" // Asegúrate de tener estilos adecuados para el modal
        overlayClassName="modal-overlay" // Asegúrate de tener estilos adecuados para el overlay
      >
        <button onClick={closeModal}>Cerrar</button>
        {selectedFood && foodDetails && (
          <div>
            <h2 className='text-xl text-center'>{selectedFood.nombre}</h2>
            <div>
              <h3>Información Nutricional:</h3>
              <p>Nombre: {foodDetails.food_name}</p>
              <p>Descripción: {foodDetails.food_description}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};