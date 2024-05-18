import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useUser } from './UserContext';

function SignIn() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { updateUser } = useUser();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/signin', credentials);
            console.log(response.data);
            updateUser(response.data);
            localStorage.setItem('userId', response.data.id);
            navigate('/workout-plan-home');
        } catch (error) {
            console.error('Sign-in failed:', error);
            alert('Please check email and password');
        }
    };

    return (
        <Container className="mt-4 d-flex justify-content-center align-items-center" style={{backgroundColor: "#82c482"}}>
            <Card style={{ width: '400px', padding: '20px', backgroundColor: '#0b360b', border: 0, color: 'white', borderRadius: '15px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign In</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                                size="lg"
                                style={{ backgroundColor: '#F2EDED', color: '#0b360b', border: '1px solid #0b360b' }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                                size="lg"
                                style={{ backgroundColor: '#F2EDED', color: '#0b360b', border: '1px solid #0b360b' }}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: '#82c482', border: 0 }}>
                            Sign In
                        </Button>
                    </Form>
                    <div className="text-center mt-3">
                        Don't have an account? <a href="/signup" style={{ color: '#82c482' }}>Sign up</a>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default SignIn;