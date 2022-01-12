import React, { useContext } from "react";
import { AppContext } from "./context";
import { Card, CardImg, Container, Row, Col } from 'reactstrap';
import { useParams } from "react-router-dom";
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

function Homepage () {
    const { products } = useContext(AppContext);
    const { productFilter, stateFilter, cityFilter } = useParams();

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
    let processedProducts = products;
    // processedProducts = processedProducts.filter(product => product.address.city = city)
    if (productFilter != null && productFilter !== '') {
        processedProducts = processedProducts.filter(product => product.product_name === productFilter)
    }
    if (stateFilter != null && stateFilter !=='') {
        processedProducts = processedProducts.filter(product => product.address.state === stateFilter)
    }
    if (cityFilter != null && cityFilter !== '') {
        processedProducts = processedProducts.filter(product => product.address.city === cityFilter)
    }
    
    // processedProducts = processedProducts.filter(product => product.address.city = city)
    let groups = groupBy(processedProducts, 'product_name');
    return(
    
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
    )
}

export default Homepage;