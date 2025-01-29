import { lazy  } from "react";
import "./App.css"
import React, { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
const Home = lazy(() => {
    return new Promise((resolve)=>{
        setTimeout(()=>{resolve((import("./pages/Home")))},0)
    })    
});
const Recipe = lazy(() => {
    return new Promise((resolve)=>{
        setTimeout(()=>{resolve((import("./pages/recipe")))},0)
    })    
});
const Search = lazy(() => {
    return new Promise((resolve)=>{
        setTimeout(()=>{resolve((import("./pages/search")))},0)
    })    
});


function App() {


    return (
        <div>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home></Home>}></Route>
                        <Route path="/recipe" element={<Recipe></Recipe>}></Route>
                        <Route path="/search" element={<Search></Search>}></Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    )
}

export default App
