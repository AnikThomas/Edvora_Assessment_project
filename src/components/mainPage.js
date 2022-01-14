import React, { useContext, useState } from "react";
import { AppContext } from "./context";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Card, CardImg, Container, Row, Col } from "reactstrap";
import { Dropdown } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../App.css";

const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );

function MainPage() {
  const { products } = useContext(AppContext);
  const [productLists, setProductLists] = useState([]);

  const productNames = products.map((product) => product.product_name);
  const productCity = products.map((product) => product.address.city);
  const productState = products.map((product) => product.address.state);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  if (products == null || products?.length === 0) {
    return <div className="container">No products</div>;
  }
  
  groupBy(products, "product_name");
  
  if (productLists == null || productLists.length === 0) {
    setProductLists(products);
  }

  const UpdateProductNameFilter = (e) => {
    if (e != null && e !== "") {
      const newLists = products.filter((product) => product.product_name === e);
      setProductLists(newLists);
    }
  };

  const UpdateStateNameFilter = (e) => {
    if (e != null && e !== "") {
      const newState = products.filter((product) => product.address.state === e);
      setProductLists(newState);
    }
  };

  const UpdateCityNameFilter = (e) => {
    if (e != null && e !== "") {
      const newCity = products.filter((product) => product.address.city === e);
      setProductLists(newCity);
    }
  };

  let groups = groupBy(productLists, "product_name");
  return (
    <div className="App">
      <Container className="bg-dark Filter">
        <Row>
          <Col className="filter-container">
            <Container className="mr-4 filter-box" style={{ width: "50%" }}>
              <h6 className="text-muted">Filters</h6>
              <hr className="bg-light" />

              {/* Dropdown Products start */}
              <Dropdown>
                <DropdownButton
                  className="mb-2 dropdown"
                  variant="dark"
                  title="Products"
                  onSelect={UpdateProductNameFilter}
                  style={{ margin: 0 }}
                >
                  {productNames.map((productName, index) => {
                    if (productNames.indexOf(productName) === index) {
                      return (
                        <Dropdown.Item
                          eventKey={productName}
                          key={index}
                          style={{ margin: 0 }}
                        >
                          {productName}
                        </Dropdown.Item>
                      );
                    } else {
                      return <div key={index}></div>;
                    }
                  })}
                </DropdownButton>
              </Dropdown>

              {/* Dropdown Products end */}

              {/* Dropdown State start */}
              <Dropdown>
                <DropdownButton
                  className="mb-2 dropdown"
                  variant="dark"
                  title="State"
                  onSelect={UpdateStateNameFilter}
                  style={{ margin: 0 }}
                >
                  {productState.map((productName, index) => {
                    if (productState.indexOf(productName) === index) {
                      return (
                        <Dropdown.Item
                          eventKey={productName}
                          key={index}
                          style={{ margin: 0 }}
                        >
                          {productName}
                        </Dropdown.Item>
                      );
                    } else {
                      return <div key={index}></div>;
                    }
                  })}
                </DropdownButton>
              </Dropdown>
              {/* Dropdown State end */}

              {/* Dropdown City start */}
              <Dropdown>
                <DropdownButton
                  className="mb-2 dropdown"
                  variant="dark"
                  title="City"
                  onSelect={UpdateCityNameFilter}
                  style={{ margin: 0 }}
                >
                  {productCity.map((productName, index) => {
                    if (productCity.indexOf(productName) === index) {
                      return (
                        <Dropdown.Item
                          eventKey={productName}
                          key={index}
                          style={{ margin: 0 }}
                        >
                          {productName}
                        </Dropdown.Item>
                      );
                    } else {
                      return <div key={index}></div>;
                    }
                  })}
                </DropdownButton>
              </Dropdown>

              {/* Dropdown City end */}
            </Container>
          </Col>

          <Col style={{ minWidth: "70vh" }}>
            <div className="bg-dark">
              {" "}
              <h1 className="text-light p-4 mb-0">Edvora</h1>
              <h2 className="text-muted p-4">Products</h2>
              {Object.keys(groups).map((groupName, index) => {
                return (
                  <div key={index}>
                    <h1 className="display-5 text-light p-4 m-0">
                      {groupName}
                    </h1>
                    <hr className="bg-light ml-4 mt-0" />
                    <Carousel
                      responsive={responsive}
                      containerClass="carousel-container"
                    >
                      {groups[groupName].map((product, index) => {
                        return (
                          <div key={index}>
                            <Container className="card-container mt-2 ml-3 p-3">
                              <Card
                                className="card p-3"
                                style={{
                                  backgroundColor: "rgb(35,35,35)",
                                  color: "white",
                                }}
                              >
                                <Row>
                                  <Col>
                                    <CardImg
                                      className="p-2 square bg-dark rounded-top"
                                      src={product.image}
                                      alt={product.product_name}
                                    />
                                  </Col>
                                  <Col>
                                    <p className="product-brand">
                                      {product.product_name}
                                    </p>
                                    <p>${product.price}</p>
                                  </Col>
                                </Row>
                                <p className="small text-muted mt-2">
                                  {product.address.city} {product.address.state}{" "}
                                  {product.date}
                                </p>
                                <p className="small">{product.discription}</p>
                              </Card>
                            </Container>
                          </div>
                        );
                      })}
                    </Carousel>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainPage;
