import React from "react";

const recipes = [
    { id: 1, title: "Ensalada FODMAP"},
    { id: 2, title: "Arroz FODMAP"},
    { id: 3, title: "Cocido FODMAP"},
    { id: 4, title: "Asado FODMAP"},
    { id: 5, title: "Pollo al limón" }
  ];

const RecipesSection: React.FC = () => {


    return (
        <div className="h-full w-full overflow-auto mt-[2%] ml-2 mr-1 scroll-container ">
            <div className='grid grid-cols-2 gap-4'>
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="m-2 rounded-lg p-24 shadow-md text-center text- text-xl border-main border-1">
                        <h1>{recipe.title}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipesSection;