import axios from 'axios';
import { HmacSHA1, enc, lib } from 'crypto-js';

const BASE_URL = '/api/rest/server.api';
const CLIENT_ID = '4d13ceb5a7f84a2582ef74a9cde073e3';
const CLIENT_SECRET = '5a9ac5f9e7dc452a920909ed5b08e293';

// Función para generar un nonce
const generateNonce = () => {
  return lib.WordArray.random(16).toString();
};

// Función para generar la firma OAuth
const generateOAuthSignature = (params: Record<string, string>, method: string, url: string, consumerSecret: string) => {
  const sortedParams = Object.keys(params).sort().map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
  const baseString = `${method.toUpperCase()}&${encodeURIComponent(url)}&${encodeURIComponent(sortedParams)}`;
  const signingKey = `${encodeURIComponent(consumerSecret)}&`;
  return HmacSHA1(baseString, signingKey).toString(enc.Base64);
};

// Función para obtener el token de autenticación (si es necesario)
export const getAuthToken = async () => {
  try {
    const params = {
      method: 'auth.token',
      oauth_consumer_key: CLIENT_ID,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_nonce: generateNonce(),
      oauth_version: '1.0',
      format: 'json'
    };
    (params as any)['oauth_signature'] = generateOAuthSignature(params, 'GET', BASE_URL, CLIENT_SECRET);
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching auth token:', error);
    throw error;
  }
};

// Función para buscar alimentos
export const searchFood = async (query: string) => {
  try {
    const params: Record<string, string> = {
      method: 'foods.search',
      search_expression: query,
      format: 'json',
      oauth_consumer_key: CLIENT_ID,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_nonce: generateNonce(),
      oauth_version: '1.0'
    };
    params['oauth_signature'] = generateOAuthSignature(params, 'GET', BASE_URL, CLIENT_SECRET);
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error searching food:', error);
    throw error;
  }
};