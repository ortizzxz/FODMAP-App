import React, { useState } from 'react';
import { Alimento } from './types';
import { searchFood, translateText, searchImage } from './fatSecretService';
import Modal from 'react-modal';
import '../styles/scrollbarCustom.css';
import '../styles/modal.css';

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
  imageUrl?: string; // Añadido para la imagen
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
      const translatedName = await translateText(food.nombre, 'en');
  
      const [details, image] = await Promise.all([
        searchFood(translatedName).catch((error) => {
          console.error('Error fetching food details:', error);
          return null;
        }),
        searchImage(translatedName).catch((error) => {
          console.error('Error fetching image:', error);
          return null;
        })
      ]);
  
      setFoodDetails({
        food_name: food.nombre, // Usa el nombre original en español
        food_description: details ? details.foods.food.food_description : 'No hay información nutricional disponible.',
        servings: details ? details.foods.food.servings?.serving : undefined,
        imageUrl: image ? image.webformatURL : undefined
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al procesar la solicitud');
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
            className="justify-center cursor-pointer border-1 border-second bg-third rounded-md w-[95%] p-4 m-2 text-center shadow-xl"
          >
            {food.previewImageUrl && <img src={food.previewImageUrl} alt={food.nombre} className="w-full h-32 object-cover" />}
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
        <button onClick={closeModal} className="w-[50%] mb-2 px-4 py-2 bg-third text-main rounded-md hover:border-main hover:bg-opacity-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-second focus:ring-opacity-50">Cerrar</button>
        {isLoading && <p>Cargando...</p>}
        {error && <p className="error text-lg text-center">Servidor en mantenimiento. <br /> Inténtelo nuevamente más tarde.</p>}
        {foodDetails && !isLoading && !error && (
          <div>
            {foodDetails.imageUrl && <img src={foodDetails.imageUrl} alt={foodDetails.food_name} />}
            <h2 className='text-xl text-center'>{foodDetails.food_name}</h2>
            <p>{foodDetails.food_description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};