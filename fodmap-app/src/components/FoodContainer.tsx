import React, { useState } from "react";
import { Alimento } from "./types";
import { searchFood } from "./fatSecretService";
import Modal from 'react-modal';
import { FoodDetails } from "./FoodDetails";
import '../styles/scrollbarCustom.css';

// Define el tipo para los detalles nutricionales si conoces su estructura
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
            // Incluye otros campos según sea necesario
        }[];
    };
}

interface FoodSearcherProps {
    alimento: Alimento[];
    onFoodClick: (alimento: Alimento) => void; // Aquí se asegura que se defina la propiedad onFoodClick
}

export const FoodSearcher: React.FC<FoodSearcherProps> = ({ alimento }) => {
    const [selectedFood, setSelectedFood] = useState<Alimento | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [foodDetails, setFoodDetails] = useState<FoodDetailResponse | null>(null);

    const handleFoodClick = async (food: Alimento) => {
        setSelectedFood(food);
        try {
            const details = await searchFood(food.nombre);
            console.log('API Response:', details); // Agrega este log para ver la respuesta
            setFoodDetails(details);
            setModalIsOpen(true);
        } catch (error) {
            console.error('Error fetching food details:', error);
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
                        className="flex justify-center cursor-pointer" // Agregué cursor-pointer para indicar que es clickeable
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
                        {foodDetails && foodDetails.foods.food[0] && (
                            <div>
                                <h3>Información Nutricional:</h3>
                                <p>Calorías: {foodDetails.foods.food[0].nutrients?.energy?.kcal || 'N/A'}</p>
                                <p>Proteínas: {foodDetails.foods.food[0].nutrients?.protein || 'N/A'}</p>
                                <p>Grasas: {foodDetails.foods.food[0].nutrients?.fat || 'N/A'}</p>
                                <p>Carbohidratos: {foodDetails.foods.food[0].nutrients?.carbohydrate || 'N/A'}</p>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};
