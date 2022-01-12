import React from "react";
import '../App.css';
import Homepage from "./Homepage";
import FilterPage from "./FilterPage";
import { Container, Row, Col } from 'reactstrap';



function MainPage() {
    return (
      <div className="App">
        <Container className="bg-dark" style={{"minWidth": "100vh", "minHeight": "100vh"}}>
          <Row>
            <Col className="mt-5" ><FilterPage/></Col>
            <Col style={{"minWidth": "70vh"}}><Homepage/></Col>
          </Row>
        </Container>
      </div>
    );
  }
  
  export default MainPage;
  