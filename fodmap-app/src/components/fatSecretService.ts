import axios from 'axios';

const CLIENT_ID = '4d13ceb5a7f84a2582ef74a9cde073e3';
const CLIENT_SECRET = '5a9ac5f9e7dc452a920909ed5b08e293';
const TOKEN_URL = '/oauth/connect/token';
const API_URL = '/api/rest/server.api';

// Función para obtener el Access Token
const getAccessToken = async (): Promise<string> => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('scope', 'basic');

  try {
    const response = await axios.post(TOKEN_URL, params, {
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

// Función para buscar alimentos
export const searchFood = async (query: string): Promise<any> => {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.post(
      API_URL,
      null,
      {
        params: {
          method: 'foods.search',
          search_expression: query,
          format: 'json',
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error searching food:', error);
    throw error;
  }
};