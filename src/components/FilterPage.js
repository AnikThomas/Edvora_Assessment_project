import React, { useContext } from "react";
import { AppContext } from "./context";
import {Dropdown, Container } from 'react-bootstrap';


function FilterPage () {
    const { products } = useContext(AppContext);
    const productNames = products.map(product => product.product_name)
    const productCity = products.map(product => product.address.city)
    const productState = products.map(product => product.address.state)
    return(
        <Container className="p-4 mr-3 square rounded-top" style={{backgroundColor:'black', width:"50%"}}>
            <h6 className="text-muted">Filters</h6><hr className="bg-light"/>
            <Dropdown className="mb-2 mt-4">
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="dark" style={{width:"125px"}}>Products</Dropdown.Toggle>
                <Dropdown.Menu variant="dark" style={{ margin: 0 }}>
                { productNames.map( (productName, index) => {
                    if(productNames.indexOf(productName) === index) {
                        return (
                            <Dropdown.Item key={index} href={"/product/" + productName}>{productName}</Dropdown.Item>
                        );
                    } else {
                        return (<div key={index}></div>)
                    }
                })}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mb-2">
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="dark" style={{width:"125px"}}>State</Dropdown.Toggle>
                <Dropdown.Menu variant="dark" style={{ margin: 0 }}>
                { productState.map( (productName, index) => {
                    if(productState.indexOf(productName) === index) {
                        return (
                            <Dropdown.Item key={index} href={"/state/" + productName}>{productName}</Dropdown.Item>
                        );
                    } else {
                        return (<div key={index}></div>)
                    }
                })}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="dark" style={{width:"125px"}}>City</Dropdown.Toggle>
                <Dropdown.Menu variant="dark" style={{ margin: 0 }}>
                { productCity.map( (productName, index) => {
                    if(productCity.indexOf(productName) === index) {
                        return (
                            <Dropdown.Item key={index} href={"/city/" + productName}>{productName}</Dropdown.Item>
                        );
                    } else {
                        return (<div key={index}></div>)
                    }
                })}
                </Dropdown.Menu>
            </Dropdown> 
        </Container>
    )
}



export default FilterPage;