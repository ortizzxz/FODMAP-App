import axios from 'axios';

const API_KEY = '4d13ceb5a7f84a2582ef74a9cde073e3'; 
const API_SECRET= '5a9ac5f9e7dc452a920909ed5b08e293'; 

export const searchFood = async (foodName: string) => {
    try {
        const response = await axios.get('/api/rest/server.api', {
            params: {
                method: 'foods.search',
                search_expression: foodName,
                format: 'json',
                oauth_consumer_key: API_KEY,
                oauth_signature_method: API_SECRET,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching food details:', error);
        throw error;
    }
};
