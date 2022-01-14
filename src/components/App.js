import React from "react";
import '../App.css';
import MainPage from "./mainPage";
import { Routes,Route } from "react-router-dom";

function App() {
  return (
    <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/product/:productFilter' element={<MainPage/>}/>
        <Route path='/state/:stateFilter' element={<MainPage />}/>
        <Route path='/city/:cityFilter' element={<MainPage/>}/>
    </Routes>
  );
}

export default App;
