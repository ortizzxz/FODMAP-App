import axios from 'axios';

const URL = 'http://localhost:9898/alimento';

interface Alimento {
    nombre: string;
    grupo: string;
    indice: string;
}

interface EmbeddedAlimentos {
    alimentoes: Alimento[];
}

interface foodServiceResponse {
    _embedded: EmbeddedAlimentos;
};

export const findAll = async (): Promise<foodServiceResponse> => {
    try {
        const response = await axios.get<foodServiceResponse>(URL);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error; // Re-lanza el error para que el componente pueda manejarlo
    }
};