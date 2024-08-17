import axios, { AxiosError } from 'axios';

const translationCache = new Map();
const apiUrl = import.meta.env.VITE_API_URL;

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {

  const cacheKey = `${text}-${targetLanguage}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  console.log(`Iniciando traducción: texto="${text}", idioma destino="${targetLanguage}"`);
  try {
    console.time('Tiempo de traducción');
    const response = await axios.post(`${apiUrl}/translate`, { text, targetLanguage });
    console.timeEnd('Tiempo de traducción');
    
    const translatedText = response.data.translatedText;
    translationCache.set(cacheKey, translatedText);
    console.log('Respuesta de traducción:', translatedText);
    return translatedText;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Error en la solicitud de traducción:', {
        mensaje: axiosError.message,
        código: axiosError.code,
        respuesta: axiosError.response?.data,
        estado: axiosError.response?.status,
        configuración: axiosError.config
      });
    } else {
      console.error('Error desconocido en la traducción:', error);
    }
    console.trace('Traza de la pila del error:');
    throw error;
  }
};

// Función para limpiar el caché de traducciones
export const clearTranslationCache = () => {
  translationCache.clear();
  console.log('Cache de traducciones limpiado.');
};

export const searchFood = async (query: string): Promise<any> => {
  console.log(`Iniciando búsqueda de comida: query="${query}"`);
  try {
    console.time('Tiempo de búsqueda');
    const response = await axios.post(`${apiUrl}/search`, { query });
    console.timeEnd('Tiempo de búsqueda');
    
    console.log('Respuesta de búsqueda:', {
      status: response.status,
      headers: response.headers,
      data: response.data
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Error en la solicitud de búsqueda:', {
        mensaje: axiosError.message,
        código: axiosError.code,
        respuesta: axiosError.response?.data,
        estado: axiosError.response?.status,
        configuración: axiosError.config
      });
    } else {
      console.error('Error desconocido en la búsqueda:', error);
    }
    console.trace('Traza de la pila del error:');
    throw error;
  }
};

// search image stock 
export const searchImage = async (query: string): Promise<any> => {
  try {
    const apiKey = import.meta.env.VITE_PIXABAY_API_KEY;
    console.log(`Realizando consulta a Pixabay con: "${query}"`); // Log so we can check the query 

    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: encodeURIComponent(query),  // no need to translate de food to send it to pixabay so we save a translation 
        image_type: 'photo',
        per_page: 5,
      }
    });

    console.log('Resultados de Pixabay:', response.data.hits);

    const hits = response.data.hits;
    if (hits.length > 0) {
      return hits[0]; // Devuelve el primer resultado
    } else {
      console.warn(`No se encontraron imágenes para la consulta: ${query}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};

