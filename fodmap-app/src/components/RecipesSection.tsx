import React from "react";

const recipes = [
    { id: 1, title: "Ensalada FODMAP"},
    { id: 2, title: "Arroz FODMAP"},
    { id: 3, title: "Cocido FODMAP"},
    { id: 4, title: "Asado FODMAP"},
    { id: 5, title: "Pollo al limón" }
  ];

const RecipesSection: React.FC = () => {
/*md:h-[90%] md:w-[90%] lg:h-[70%]  max-w-sm w-full rounded-lg p-24 shadow-md 
text-center text-xl flex flex-col  border-main border-1*/ 

    return (
        <div className="h-full w-full overflow-auto mt-[2%]  mr-1 scroll-container"> 
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center'>
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="border-1 border-main rounded-lg shadow-md overflow-hidden flex flex-col h-80 w-full max-w-sm">
                        <div className="flex-grow">
                            <img src="src/assets/defaultImage.jpg" alt="Imagen receta" className="h-full w-full object-cover"/>
                        </div>
                        <h1 className="text-xl p-2 text-center font-semibold">{recipe.title}</h1>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default RecipesSection;