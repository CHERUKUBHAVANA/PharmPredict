import React from 'react';
import Layout from './core-components/Layout';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { CDBLink } from 'cdbreact';
import { isAuth } from './auth-components/helpers';
import './App.css';

const App = () => {
  const cardsData = [
    {
      title: 'Drug Supply',
      description: 'We ensure timely and efficient supply of a diverse range of drugs to local pharmacies, maintaining a reliable inventory management system.',
    },
    {
      title: 'Therapeutic Class Prediction',
      description: 'Our ML and DL models predict the therapeutic class of drugs, providing valuable insights into their usage and effects.',
    },
    {
      title: 'Exploratory Data Analysis (EDA)',
      description: 'We offer detailed EDA to analyze and visualize data trends, helping you make informed decisions and optimize your drug supply chain.',
    },
  ];

  const renderCards = () => {
    return cardsData.map((card, index) => (
      <Col md={4} key={index} className="mb-4">
        <Card className="h-100 shadow">
          <Card.Body>
            <Card.Title className="h4">{card.title}</Card.Title>
            <Card.Text className="card-description">{card.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <h2 className="display-4 mb-2">Welcome to Drug Management System</h2>
            <p className="lead">
              We supply a variety of drugs to local pharmacies, utilizing advanced Machine Learning (ML) and Deep Learning (DL) models to predict the therapeutic class of drugs. Our system provides detailed analysis through Exploratory Data Analysis (EDA).
            </p>
          </Col>
        </Row>

        <Row className="my-2">
          {renderCards()}
        </Row>

        <Row className=" text-center">
          <Col>
           {!isAuth() && (<CDBLink to="/pharma/signup" className="bg-dark text-white p-2" style={{ display:"inline-block", border:"2px solid black", borderRadius: "10px" }}>
              Get Started
            </CDBLink>)}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default App;
