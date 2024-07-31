import React, { useState } from 'react';
import { Alimento } from './types'; // Define la interfaz Alimento en un archivo separado
import { searchFood } from '../../fatSecretService';
import Modal from 'react-modal'; // Asegúrate de tener react-modal instalado
import '../styles/scrollbarCustom.css';

// Interfaz FoodBuscadorProps
interface FoodBuscadorProps {
    alimento: Alimento;
    className?: string; // -> esto para que no dé error en FoodSearcher
}

export const FoodDetails: React.FC<FoodBuscadorProps> = ({ alimento, className }) => {
    const [selectedFood, setSelectedFood] = useState<Alimento | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [foodDetails, setFoodDetails] = useState<any>(null);

    const capitalizeFirstLetter = (string: string): string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleFoodClick = async (food: Alimento) => {
        setSelectedFood(food);
        setModalIsOpen(true);
        try {
            const details = await searchFood(food.nombre);
            setFoodDetails(details);
        } catch (error) {
            console.error('Error fetching food details:', error);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setFoodDetails(null);
    };

    return (
        <><div className="border-1 border-second bg-third rounded-md w-full p-4 m-2 text-center shadow-xl">
            <h3 className="text-2xl">{alimento.nombre}</h3>
            <p className="text-lg">Indice FODMAP: {capitalizeFirstLetter(alimento.indice)}</p>
        
        {selectedFood && (
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Food Details">
                    <h2>{selectedFood.nombre}</h2>
                    {foodDetails ? (
                        <div>
                            <h3>Nutrition Information</h3>
                            <ul>
                                {foodDetails.foods.food[0].nutrients.map((nutrient: any) => (
                                    <li key={nutrient.nutrient_name}>
                                        {nutrient.nutrient_name}: {nutrient.value} {nutrient.unit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <button onClick={closeModal}>Close</button>
                </Modal>
            )}
        </div>

        </>
    );
};
