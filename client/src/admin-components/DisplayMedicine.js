import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Alert, Form } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const DisplayMedicine = () => {
    const [medicineData, setMedicineData] = useState([]);
    const [visibleMedicines, setVisibleMedicines] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const fetchMedicineData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/display-medicine`);
            setMedicineData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('Error fetching medicine data');
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMedicineData();
    }, []);
    const loadMore = () => {
        setVisibleMedicines((prevCount) => prevCount + 10);
    };
    const handleSearch = () => {
        const filteredMedicines = medicineData.filter((medicine) =>
            medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMedicineData(filteredMedicines);
        setVisibleMedicines(10);
    };
    const resetSearch = () => {
        setSearchTerm('');
        fetchMedicineData();
        setVisibleMedicines(10);
    };

    if (loading || error) {
        return (
            <div className={`text-center mt-5 ${error ? 'error-state' : ''}`}>
                {error ? (
                    <Alert variant="danger">
                        <strong>Error:</strong> {error}
                    </Alert>
                ) : (
                    <BeatLoader color="#007bff" size={15} />
                )}
            </div>
        );
    }

    return (
        <div>
            <h2 className="mb-4 text-center">Medicine List</h2>
            <Form className="m-3">
                <Row className="justify-content-end">
                    <Col xs="auto">
                        <Form.Group controlId="searchTerm">
                            <Row className="align-items-center m-0">
                                <Col xs="auto">
                                    <FontAwesomeIcon icon={faSearch} />
                                </Col>
                                <Col xs="auto">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search for a drug..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                    <Col xs="auto">
                        <Button variant="primary" className="mr-2" onClick={handleSearch}>
                            {' '}Search
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="secondary" onClick={resetSearch}>
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                {medicineData.slice(0, visibleMedicines).map((medicine, index) => (
                    <Col key={index} md={6}>
                        <Card className="m-4" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <Card.Body className='text-center'>
                                <Card.Title>{medicine.name.toUpperCase()}</Card.Title>
                                <Card.Text>Substitute: {medicine.substitute0}</Card.Text>
                                <Card.Text>Side Effect: {medicine.sideEffect0}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className='text-center'>
                {visibleMedicines < medicineData.length && (
                    <Button variant="primary" className="mt-3" onClick={loadMore}>
                        Load More
                    </Button>
                )}
            </div>
        </div>
    );
};

export default DisplayMedicine;
