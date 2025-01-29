import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

// Component to render each result
const ResultItem = ({ title, image, id }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => {
                navigate("/recipe", {
                    state: {
                        title,
                        image,
                        id,
                    },
                });
            }}
            className="cursor-pointer p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mt-2" />
        </div>
    );
};

const Search = () => {
    const [data, setData] = useState({});
    const location = useLocation();
    const minServing = location.state?.minServing;
    const dish = location.state?.dish;

    const [maxPage,setMaxPage]=useState(1)
    const [currPage,setCurrPage]=useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const offset=(currPage-1)*12
                const result = await fetch(
                    `https://api.spoonacular.com/recipes/complexSearch?query=${dish}&number=12&offset=${offset}&apiKey=6311ae6ba06349b9b24ebc42b19fb517`
                );
                const data = await result.json();
                setData(data);
                setMaxPage(parseInt((data["totalResults"]+11)/12))
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (dish) {
            fetchData();
        }
    }, [currPage]);
    const navigate=useNavigate()
    return (
        <div>
            <div>
                <button onClick={()=>{
                    
                    navigate("/")
                }}  className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300">
                    Home
                </button>
            </div>
            <div className="min-h-screen flex flex-col items-center p-4">
                <div className="text-2xl font-bold text-gray-800 mb-6">Dish: {dish}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {data["results"]?.length > 0 ? (
                        data["results"].map((item, index) => (
                            <ResultItem key={index} title={item.title} image={item.image} id={item.id} />
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <br></br>
                <div>
                    <PageButton pageNo={1} setCurrPage={setCurrPage} isActive={currPage === 1}></PageButton>
                    {currPage-1!=1&&currPage-1!=0?<PageButton pageNo={currPage-1} setCurrPage={setCurrPage} isActive={false}></PageButton>:null}
                    {(currPage!=1)&&(currPage!=maxPage)?<PageButton pageNo={currPage} setCurrPage={setCurrPage} isActive={true}></PageButton>:null}
                    {currPage+1!=maxPage&&currPage+1!=maxPage+1?<PageButton pageNo={currPage+1} setCurrPage={setCurrPage} isActive={false}></PageButton>:null}
                    {maxPage!=1?<PageButton pageNo={maxPage} setCurrPage={setCurrPage} isActive={currPage === maxPage} ></PageButton>:null}
                </div>
            </div>
        </div>
    );
};

function PageButton({ pageNo, setCurrPage, isActive }) {
    return (
        <button
            onClick={() => setCurrPage(pageNo)}
            className={`px-4 py-2 mx-1 rounded-md border transition 
                ${isActive ? "bg-indigo-500 text-white border-indigo-600" 
                           : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
        >
            {pageNo}
        </button>
    );
}

export default Search;
