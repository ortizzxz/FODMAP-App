// main.tsx o index.tsx (dependiendo de tu configuración)
import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/Sidebar'; // Ajusta la ruta según tu estructura de archivos
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Sidebar />
    </React.StrictMode>,
    document.getElementById('root')
);
