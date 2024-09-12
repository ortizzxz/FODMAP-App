import React from "react";

export const About: React.FC = () => {

    return (
        <div className=" flex items-center  justify-center w-full ">
            <div className=" rounded-lg max-w-2xl w-full mx-4 text-justify">
                <h1 className="text-2xl font-bold mb-4 text-[#54652d] text-center">Acerca de TuFODMAP</h1>
                <p className="mb-4">
                    TuFODMAP es una herramienta diseñada para ayudar a las personas que siguen una dieta baja en FODMAP.
                    Nuestra aplicación proporciona información detallada sobre los alimentos y su contenido FODMAP,
                    facilitando la toma de decisiones alimentarias informadas.
                </p>
                <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic explicabo id cumque at cupiditate. Obcaecati hic accusantium dignissimos inventore quis porro tempora cum! Quod aut dolore possimus velit molestias magni, dolorum nobis voluptatum repudiandae saepe aperiam molestiae illum sit cum eaque minus voluptatem. Qui necessitatibus quod delectus, iste deserunt neque!
                </p>
                <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod distinctio enim id excepturi. Optio voluptatibus reprehenderit iusto, enim ut minus dignissimos fugit. Soluta deleniti sint repudiandae nulla fuga voluptatum autem.
                </p>
            </div>
        </div>
    );
}