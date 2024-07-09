import { findAll } from "../services/foodService";
import { useEffect, useState } from "react"
import '../styles/App.css'
import '../styles/legendStyle.css'

const initialDataForm = {
    nombre: ''
}

export const FoodBuscador = ({ setSearchTerm }) => {
    return (
        <input
            type="text"
            placeholder="Buscar alimento..."
            id="searchBar"
            onChange={(event) => setSearchTerm(event.target.value)}
        />
    );
};