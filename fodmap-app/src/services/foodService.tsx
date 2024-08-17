import axios, { AxiosResponse } from "axios";

const URL = 'https://fodmap-app.onrender.com'

// vamos a definir una interfaz para el tipo de dato que espero recibir desde el backend 
interface Alimento {
    id: number; 
    nombre: string;
    tipo: string;
    grupo: string;
    indice: string;
};

interface EmbeddedAlimento {
    _embedded: {
        alimentoes: Alimento[];
    };
}


// tipiado para especificar que la funcion retorna null 
    // (): null 

export const listProduct = (): null => {
    return null; 
};
    
// tipiado para especificar que la funcion retorna una promesa de un axio response de un alimento o nulo  
export const findAll = async (): Promise< AxiosResponse<EmbeddedAlimento> | null > => { 
    
    try {
        const response = await axios.get<EmbeddedAlimento>(URL);
        return response;    
    } catch (error) {
        console.log(error);
    }

    return null;
}; 

// INSTALAR TYPES PARA AXIOS -> npm install @types/axios
