import { useState } from "react";
import { useNavigate } from "react-router";

const Home = () => {
    const [minServing, setMinServing] = useState(1);
    const [dish, setDish] = useState("");
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center mt-10 p-4">
            <div className="text-2xl font-bold text-gray-800">Recipe Finder</div>
            <div className="text-lg text-gray-600 mb-4">
                Search Your Favourite Recipes And Make It
            </div>
            <div className="w-full max-w-md">
                <div className="text-sm font-medium text-gray-700 mb-2">Dish Name</div>
                <input
                    type="text"
                    placeholder="Dish Name (e.g., Pasta)"
                    onChange={(e) => setDish(e.target.value)}
                    className="p-3 border-2 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                />
            </div>
            <button
                onClick={() => {
                    navigate("/search", {
                        state: {
                            minServing: minServing,
                            dish: dish,
                        },
                    });
                }}
                className="mt-6 px-6 py-3 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
            >
                Find
            </button>
        </div>
    );
};

export default Home;
