import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/signup', userData);
            console.log(response.data);
            alert('Registration successful');
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('User already exists');
        }
    };

    return (
        <Container className="mt-4 d-flex justify-content-center align-items-center" style={{backgroundColor: "#82c482"}}>
            <Card style={{ width: '400px', padding: '20px', backgroundColor: '#0b360b', border: 0, color: 'white' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Control
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100" style={{backgroundColor: '#82c482', border: 0}}>
                            Sign Up
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        Already have an account? <Link to="/" style={{color: '#82c482'}}>Sign In</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SignUp;