{/* Interface for the object Alimento received from the backend */}
export interface Alimento {
    nombre: string;
    tipo: string;
    grupo: string;
    indice: string;
    previewImageUrl?: string;
}
