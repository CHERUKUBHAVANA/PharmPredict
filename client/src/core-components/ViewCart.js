import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Layout from './Layout'
import { isAuth } from '../auth-components/helpers'
import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
    const ViewCart = () => {
        const [userCart, setUserCart] = useState(null);
      
        useEffect(() => {
          const fetchUserCart = async () => {
            try {
              const response = await axios.get(`${process.env.REACT_APP_API}/user-cart/${isAuth()._id}`);
              setUserCart(response.data.cart); 
            } catch (error) {
              console.error('Error fetching user cart:', error);
            }
          };
      
          fetchUserCart();
        }, []); // The empty dependency array ensures the effect runs once on component mount
      
        return (
          <Layout>
            <h1 style={{textAlign:'center'}}>My Cart:</h1>
            {userCart ? (
              <ul>
                {userCart.map((medicine, index) => (
                  <li key={index} style={{listStyleType:'none'}}>
                    <Row>
                        <Col key={index} md={6}>
                            <Card className="m-4" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: 'lightblue', width: '85%', height: '85%' }}>
                                <Card.Body className='text-center'>
                                    <Card.Title>{medicine.name.toUpperCase()}</Card.Title>
                                    <Card.Title>{medicine.ChemicalClass !== 'NA' ? medicine.ChemicalClass : ' '}</Card.Title>
                                    <Card.Text><strong>Substitutes:</strong> {medicine.substitute0},{' '}{medicine.substitute1},{' '}{medicine.substitute2}</Card.Text>
                                    <Card.Text><strong>Side Effects:</strong> {medicine.sideEffect0},{' '}{medicine.sideEffect1}, {' '}{medicine.sideEffect2}</Card.Text>
                                    <Card.Text><strong>Uses:</strong> {medicine.use0},{' '}{medicine.use1}, {' '}{medicine.use2}</Card.Text>
                                    <Button variant='success' style={{ paddingLeft: '20px', paddingRight: '20px', border: '1.5px solid black', borderRadius: '10px' }}>Buy</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                </Row>
                    </li>
                ))}
              </ul>
            ) : (
              <p>Loading cart...</p>
            )}
          </Layout>
        );
      };
export default ViewCart