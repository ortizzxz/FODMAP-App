/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PIXABAY_API_KEY: string;
    // otras variables de entorno...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }