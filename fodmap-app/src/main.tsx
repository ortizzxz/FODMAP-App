import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/Sidebar'; 
import './index.css';
import { ProductApp } from './components/ProductApp';

ReactDOM.render(
    <React.StrictMode>
        <ProductApp />
    </React.StrictMode>,
    document.getElementById('root')
);
