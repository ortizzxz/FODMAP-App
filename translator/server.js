require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
});

// FatSecret API configuration
let accessToken = null;
let tokenExpiration = 0;

const getAccessToken = async () => {
  if (accessToken && Date.now() < tokenExpiration) {
    return accessToken;
  }

  try {
    const response = await axios.post('https://oauth.fatsecret.com/connect/token', 
      'grant_type=client_credentials&scope=basic', 
      {
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    accessToken = response.data.access_token;
    tokenExpiration = Date.now() + (response.data.expires_in * 1000);
    console.log('New access token obtained');
    return accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Routes
app.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    const response = await axios.post(`https://translation.googleapis.com/language/translate/v2`, null, {
      params: {
        q: text,
        target: targetLanguage,
        key: process.env.API_KEY
      }
    });

    res.json({ translatedText: response.data.data.translations[0].translatedText });
  } catch (error) {
    console.error('Error en la traducción:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error en la traducción' });
  }
});

app.post('/search', async (req, res) => {
  try {
    const token = await getAccessToken();
    const { query } = req.body;

    console.log('Searching for:', query);

    const response = await axios.post('https://platform.fatsecret.com/rest/server.api', null, {
      params: {
        method: 'foods.search',
        search_expression: query,
        format: 'json',
        max_results: 1 // Limitar los resultados a 1
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data.foods && response.data.foods.food) {
      const foods = Array.isArray(response.data.foods.food) 
        ? response.data.foods.food 
        : [response.data.foods.food];

      // Buscar una coincidencia exacta
      const exactMatch = foods.find(food => food.food_name.toLowerCase() === query.toLowerCase());

      if (exactMatch) {
        // Obtener detalles nutricionales del alimento exacto
        const detailsResponse = await axios.post('https://platform.fatsecret.com/rest/server.api', null, {
          params: {
            method: 'food.get.v2',
              food_id: exactMatch.food_id,
            format: 'json'
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const foodDetails = detailsResponse.data.food;
        res.json(foodDetails);
      } else {
        res.status(404).json({ error: 'No exact match found' });
      }
    } else {
      res.status(404).json({ error: 'No foods found' });
    }
  } catch (error) {
    console.error('Error searching food:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error searching food', details: error.response ? error.response.data : error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
