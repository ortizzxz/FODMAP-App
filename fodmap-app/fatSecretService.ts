import axios from 'axios'
import qs from 'qs'

const API_KEY = '4d13ceb5a7f84a2582ef74a9cde073e3';
const API_SECRET = '5a9ac5f9e7dc452a920909ed5b08e293';
const BASE_URL = 'https://platform.fatsecret.com/rest/server.api';

const getAccessToken = async () => {
    const response = await axios.post(
        'https://oauth.fatsecret.com/connect/token',
        qs.stringify({
            grant_type: 'client_credentials',
            scope: 'basic',
            client_id: API_KEY,
            client_secret: API_SECRET
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );
    return response.data.access_token;
};

export const searchFood = async (query: string) => {
    const accessToken = await getAccessToken();
    const response = await axios.get(BASE_URL, {
        params: {
            method: 'foods.search',
            search_expression: query,
            format: 'json'
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.data;
};
