import axios from "axios";

const URL = 'http://localhost:9898/alimento'

export const listProduct = () => {
    return null; 
};

export const findAll = async () => { 
    
    try {
        const response = await axios.get(URL);
        return response;    
    } catch (error) {
        console.log(error);
    }

    return null;
}; 