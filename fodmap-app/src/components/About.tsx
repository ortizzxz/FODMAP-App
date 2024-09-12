import React from "react";

export const About: React.FC = () => {

    return (
        <div className=" flex items-center  justify-center w-full ">
            <div className=" rounded-lg max-w-2xl w-full text-[#54652d] mx-4 text-justify">
                <h1 className="text-2xl font-bold mb-4  text-center">Acerca de TuFODMAP</h1>
                <p className="mb-4">
                En tufodmap.com, nuestro objetivo es facilitar la vida de quienes enfrentan el síndrome del intestino irritable SII a través de una herramienta práctica y accesible. Este sitio es un buscador de alimentos que te proporciona información sobre el índice FODMAP de cada producto, ayudándote a tomar decisiones informadas sobre tu dieta.
                </p>
                <p className="mb-4">
                    La idea de desarrollar esta aplicación nació de mi propia experiencia con el SII. Tras lidiar con los desafíos que esta condición implica, comprendí la necesidad de contar con un recurso que simplificara la identificación de alimentos adecuados y que permitiera a otros como yo mejorar su calidad de vida.                   </p>
                <p className="mb-4">
                En tufodmap.com, creemos que la información es poder. Por eso, nos esforzamos por ofrecer una plataforma intuitiva que no solo te ayude a conocer la información nutricional del alimento.</p>
            </div>
        </div>
    );
}