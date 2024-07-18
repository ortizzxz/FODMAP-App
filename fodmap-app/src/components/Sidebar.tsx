import React, { useState } from 'react';
import { ProductApp } from './ProductApp'; // Asegúrate de que la ruta sea correcta
import { MedicalRecommendations } from './MedicalRecommendations'; // Asegúrate de que la ruta sea correcta

const Sidebar: React.FC = () => {
    const [activeTab, setActiveTab] = useState('search');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        setIsSidebarVisible(true); // Cerrar la barra lateral cuando se selecciona una pestaña
    };

    return (
        <div className="h-screen flex bg-[#272222]">
            {/* Sidebar */}
            <div className={`bg-main p-2 text-second flex flex-col rounded-3xl m-1 transition-all duration-300 ${isSidebarVisible ? 'w-64' : 'w-20'}`}>
                <div className="flex flex-col flex-grow">
                    <div>
                        
                        {isSidebarVisible && (
                            <div>
                                <div className="p-4 font-bold text-center text-xl">Menú</div>
                                <button 
                                    className={`p-2 h-[40%] text-center mb-2 w-full hover:bg-third hover:border-third transition duration-300 ${activeTab === 'search' ? 'bg-third' : 'bg-main'} focus:border-main focus:outline-none`} 
                                    onClick={() => handleTabClick('search')}
                                >
                                    Búsqueda
                                </button>
                                <button 
                                    className={`p-2 h-[40%] text-center w-full hover:bg-third hover:border-third transition duration-300 ${activeTab === 'recommendations' ? 'bg-third' : 'bg-main'} focus:border-main focus:outline-none`} 
                                    onClick={() => handleTabClick('recommendations')}
                                >
                                    Recomendaciones Médicas
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex-grow"></div> {/* Este div ocupa el espacio restante */}
                    <div>
                        {/* Botón al fondo de la barra */}
                        <button 
                            className="mb-2 h-20 text-center w-full bg-main text-second hover:border-main focus-within::bg-[#a59e95] active:bg-[#af9987] transition duration-300"
                            onClick={toggleSidebar}
                        >
                            {isSidebarVisible ? 'Ocultar' : 'Mostrar'} Menú
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow bg-gray-100 overflow-auto">
                <div className="h-full">
                    {activeTab === 'search' ? (
                        <ProductApp />
                    ) : (
                        <MedicalRecommendations />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
