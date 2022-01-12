import React, { useState, createContext, useEffect } from 'react';

const url = 'https://assessment-edvora.herokuapp.com';
const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [ products, setProducts] = useState([])


//I need useEffect so the fetch will not run on repeat
    useEffect(() => {
        console.log('fetching');
        fetch(url, { method: "get"})
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setProducts(data)
            })
            .catch((err) => console.log(err));
            return () => {};
        }, []);
    
    return(
        <AppContext.Provider value={{
            products
        }}>
            { children }
        </AppContext.Provider>
    )
};

export { AppContext, AppProvider }