import React, { useContext, useState } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { AppContext } from "./context";
import { Card, CardImg, Container, Row, Col } from 'reactstrap';
import {Dropdown } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../App.css'; 

const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }), 
  {},
);


function MainPage() {
  const { products } = useContext(AppContext);
  const [ productLists, setProductLists] = useState([]);


  const productNames = products.map(product => product.product_name)
  const productCity = products.map(product => product.address.city)
  const productState = products.map(product => product.address.state)

    // console.log(productFilter);
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      
    if (products == null || products?.length === 0) {
        return(
            <div className="container">
               No products
            </div>
        )
    }
    console.log(groupBy(products, 'product_name'));
     if ( productLists == null  || productLists.length === 0 ){
       console.log("Set product list 1st time")
      setProductLists(products)
     }
    

    const UpdateProductNameFilter = (e) => {
      console.log(e);
      if (e != null && e !=='') {
        console.log("Attempting new lists")
                const newLists = products.filter(product => product.product_name === e)
                setProductLists(newLists);
                console.log('newLists:' + JSON.stringify(newLists));
          }
    }

    const UpdateStateNameFilter = (e) => {
      console.log(e);
      if (e != null && e !=='') {
        console.log("Attempting new State")
                const newState = products.filter(product => product.address.state === e)
                setProductLists(newState);
                console.log('newState:' + JSON.stringify(newState));
          }
    }

    const UpdateCityNameFilter = (e) => {
      console.log(e);
      if (e != null && e !=='') {
        console.log("Attempting new City")
                const newCity = products.filter(product => product.address.city === e)
                setProductLists(newCity);
                console.log('newCity:' + JSON.stringify(newCity));
          }
    }

    let groups = groupBy(productLists, 'product_name');
    return (
      <div className="App">
        <Container className="bg-dark FilterContainer">
          <Row>
            <Col className="mt-5" >
            <Container className="p-4 mr-3 square rounded-top" style={{backgroundColor:'black', width:"50%"}}>
            <h6 className="text-muted">Filters</h6><hr className="bg-light"/>

            {/* Dropdown Products start */}
            <Dropdown>
            <DropdownButton className="mb-2" variant="dark" title="Products" onSelect={UpdateProductNameFilter} style={{ width:'150px'}}>
            
            { productNames.map( (productName, index) => {
                    if(productNames.indexOf(productName) === index) {
                        return (
                            <Dropdown.Item eventKey={productName} key={index} style={{ margin: 0 }}>{productName}</Dropdown.Item>
                        );
                    } else {
                        return (<div key={index}></div>)
                    }
                })}
            </DropdownButton>
            </Dropdown>

            {/* Dropdown Products end */}

                 {/* Dropdown State start */}
            <Dropdown>
            <DropdownButton className="mb-2" variant="dark" title="State" onSelect={UpdateStateNameFilter} style={{margin: 0  }}>
            
            { productState.map( (productName, index) => {
                    if(productState.indexOf(productName) === index) {
                        return (
                            <Dropdown.Item eventKey={productName} key={index} style={{ margin: 0 }}>{productName}</Dropdown.Item>
                        );
                    } else {
                        return (<div key={index}></div>)
                    }
                })}
            </DropdownButton>
            </Dropdown>
            {/* Dropdown State end */}

            
             {/* Dropdown City start */}
             <Dropdown>
              <DropdownButton className="mb-2" variant="dark" title="City" onSelect={UpdateCityNameFilter}>
              
              { productCity.map( (productName, index) => {
                      if(productCity.indexOf(productName) === index) {
                          return (
                              <Dropdown.Item eventKey={productName} key={index} style={{ margin: 0 }}>{productName}</Dropdown.Item>
                          );
                      } else {
                          return (<div key={index}></div>)
                      }
                  })}
              </DropdownButton>
            </Dropdown>

            {/* Dropdown City end */}
        </Container>
            </Col>
            <Col style={{"minWidth": "70vh"}}>
            <div className="bg-dark"> <h1 className="text-light p-4 mb-0">Edvora</h1>
            <h2 className="text-muted p-4 mb-0">Products</h2>
        {Object.keys (groups).map((groupName, index) => {
            
            return(
                <div key={index}>
                    <h1 className="display-5 text-light p-4 m-0">{groupName}</h1><hr className="bg-light ml-4 mt-0"/>
                    <Carousel responsive={responsive} containerClass="carousel-container">
                        {groups[groupName].map((product, index)=>{
                            return(
                                <div key={index}>
                                    <Container className="mt-2 ml-3 p-3" style={{backgroundColor:'black'}}>
                                        <Card className="p-3" style={{ width: '80', height: '80',backgroundColor: 'rgb(35,35,35', color:'white' }}>
                                            <Row>
                                                <Col>
                                                    <CardImg className="p-2 square bg-dark rounded-top" top width="150%" height="75%" src={product.image} alt={product.product_name} />
                                                </Col>
                                                <Col>
                                                    <p className="product-brand">{product.product_name}</p>
                                                    <p>${product.price}</p>
                                                </Col>
                                            </Row>
                                                <p className="small text-muted mt-2">{product.address.city} {product.address.state}  {product.date}</p>
                                                <p className="small">{product.discription}</p>
                                        </Card>
                                    </Container>
                                </div>
                            )        
                        })}
                    </Carousel>
                </div>         
            ) 
        })}
        </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  
  export default MainPage;
  