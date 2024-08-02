import axios from 'axios';

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  try {
    const response = await axios.post('/api/translate', { text, targetLanguage });
    return response.data.translatedText;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error al traducir:', error.response ? error.response.data : error.message);
    } else {
      console.error('Error al traducir:', error);
    }
    throw error;
  }
};

export const searchFood = async (query: string): Promise<any> => {
  try {
    console.log('Sending search request:', query);
    const response = await axios.post('/api/search', { query });
    console.log('Search response:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error searching food:', error.response ? error.response.data : error.message);
    } else {
      console.error('Error searching food:', error);
    }
    throw error;
  }
};

  
  
