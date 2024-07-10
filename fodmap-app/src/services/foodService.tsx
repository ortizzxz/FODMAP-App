import axios, { AxiosResponse } from "axios";

const URL = 'http://localhost:9898/alimento'

// vamos a definir una interfaz para el tipo de dato que espero recibir desde el backend 
interface Alimento {
    id: number; 
    nombre: string;
    tipo: string;
    grupo: string;
    indice: string;
};

// tipiado para especificar que la funcion retorna null 
    // (): null 

export const listProduct = (): null => {
    return null; 
};
    
// tipiado para especificar que la funcion retorna una promesa de un axio response de un alimento o nulo  
export const findAll = async (): Promise< AxiosResponse<Alimento[]> | null > => { 
    
    try {
        const response = await axios.get(URL);
        return response;    
    } catch (error) {
        console.log(error);
    }

    return null;
}; 

// INSTALAR TYPES PARA AXIOS -> npm install @types/axios
