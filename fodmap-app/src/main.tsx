import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ProductApp } from './components/ProductApp';

// Asegurarnos de que el elemento con id 'root' existe y es del tipo correcto
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ProductApp />
    </React.StrictMode>
  );
} else {
  console.error('Elemento con id "root" no encontrado.');
}
