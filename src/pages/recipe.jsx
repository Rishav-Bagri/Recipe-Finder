import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Recipe = () => {
    const [recipeData, setRecipeData] = useState([]);
    const [error, setError] = useState(null);

    const location = useLocation();
    const id = location.state?.id;
    console.log(id);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=6311ae6ba06349b9b24ebc42b19fb517`
                );
                const data = await response.json();
                setRecipeData(data);
            } catch (err) {
                setError("Failed to fetch recipe data.");
            }
        };
        if (id) {
            fetchRecipe();
        }
    }, [id]);

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (!recipeData?.length) {
        return <div className="text-center text-gray-500">Loading...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {recipeData.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {section.name || "Recipe Instructions"}
                    </h2>
                    {section.steps.map((step) => (
                        <div key={step.number} className="mb-6">
                            <h3 className="text-2xl font-semibold text-indigo-600">
                                Step {step.number}
                            </h3>
                            <p className="text-gray-700 mt-2">{step.step}</p>

                            {step.ingredients.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        Ingredients:
                                    </h4>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        {step.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {step.equipment.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        Equipment:
                                    </h4>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        {step.equipment.map((equip, index) => (
                                            <li key={index}>
                                                {equip.name}
                                                {equip.temperature && (
                                                    <span className="text-sm text-gray-600">
                                                        {" "}
                                                        (Temperature: {equip.temperature.number}{" "}
                                                        {equip.temperature.unit})
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {step.length && (
                                <p className="mt-2 text-gray-600">
                                    Duration: {step.length.number} {step.length.unit}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Recipe;
