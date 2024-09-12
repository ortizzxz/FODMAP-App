import React from "react";

export const About: React.FC = () => {

    return (
        <div className=" flex items-center  justify-center ">
            <div className="p-6 rounded-lg max-w-2xl w-full mx-4">
                <h1 className="text-2xl font-bold mb-4 text-[#54652d] text-center">Acerca de TuFODMAP</h1>
                <p className="mb-4">
                    TuFODMAP es una herramienta diseñada para ayudar a las personas que siguen una dieta baja en FODMAP.
                    Nuestra aplicación proporciona información detallada sobre los alimentos y su contenido FODMAP,
                    facilitando la toma de decisiones alimentarias informadas.
                </p>
                <p className="mb-4">
                    Desarrollado por un equipo apasionado por la salud digestiva, TuFODMAP se esfuerza por ser
                    una fuente confiable y fácil de usar para la comunidad hispanohablante que busca manejar
                    sus síntomas gastrointestinales a través de la dieta.
                </p>
            </div>
        </div>
    );
}