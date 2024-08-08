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

// FatSecret API 
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

// Searching

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
        max_results: 50  // Aumenta esto para obtener más resultados
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('FatSecret API Response:', JSON.stringify(response.data, null, 2));
    console.log('FatSecret API Status:', response.status);
    console.log('FatSecret API Headers:', response.headers);

    res.json(response.data);

  } catch (error) {
    console.error('Error searching food:', error.response ? error.response.data : error.message);
    console.error('Error details:', error.response ? error.response : error);
    res.status(500).json({ 
      error: 'Error searching food', 
      details: error.response ? error.response.data : error.message,
      stack: error.stack
    });
  }
});

// Image searching - PIXABAY 
app.post('/image-search', async (req, res) => {
  try {
    const { query } = req.body;
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: process.env.PIXABAY_API_KEY,
        q: query,
        image_type: 'photo',
        category: 'food',
        per_page: 1
      }
    });

    res.json(response.data.hits[0]);
  } catch (error) {
    console.error('Error fetching image:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching image' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
