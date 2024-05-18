/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, FormControl, Button, Card, Row, Col } from 'react-bootstrap';
import { useUser } from '../user/UserContext';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/workout-plans';

function CreateWorkoutPlan() {
    const [workoutPlan, setWorkoutPlan] = useState({
        title: '',
        description: '',
        routines: [],
        exercises: [],
        sets: [],
        repetitions: []
    });

    const { user } = useUser();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'routines' || name === 'exercises' || name === 'sets' || name === 'repetitions') {
            const arrayValue = value.split('\n');
            setWorkoutPlan({ ...workoutPlan, [name]: arrayValue });
        } else {
            setWorkoutPlan({ ...workoutPlan, [name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!workoutPlan.title || !workoutPlan.description || !workoutPlan.routines.length || !workoutPlan.exercises.length || !workoutPlan.sets.length || !workoutPlan.repetitions.length) {
            alert('Please fill in all required fields.');
            return;
        }
        const planToSubmit = {
            ...workoutPlan,
            userId: user.id
        };
        try {
            const response = await axios.post(API_URL, planToSubmit);
            alert('Workout Plan Added!');
            navigate('/workout-plan-home');
            setWorkoutPlan({
                title: '',
                description: '',
                routines: [],
                exercises: [],
                sets: [],
                repetitions: []
            });
        } catch (error) {
            console.error('Failed to add workout plan:', error);
        }
    };

    return (
        <Container className="mt-4" style={{ width: "470px", marginLeft: "250px" }}>
            <Card style={{ backgroundColor: "#0b360b", border: "1px solid #ced4da", color: "white" }} className='p-3 mb-4 bg-dark text-white'>
                <Card.Body>
                    <Card.Title style={{ textAlign: "center", margin: "25px" }}><h3>Share New Workout Plan</h3></Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="title"
                                        value={workoutPlan.title}
                                        style={{ backgroundColor: "#82c482", border: 0, color: "white" }}
                                        onChange={handleChange}
                                        placeholder="Title"
                                    />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <FormControl
                                        as="textarea"
                                        name="description"
                                        value={workoutPlan.description}
                                        style={{ backgroundColor: "#82c482", border: 0, color: "white" }}
                                        onChange={handleChange}
                                        placeholder="Description"
                                    />
                                </Form.Group>
                                <Form.Group controlId="routines">
                                    <Form.Label>Routines (one per line)</Form.Label>
                                    <FormControl
                                        as="textarea"
                                        name="routines"
                                        value={workoutPlan.routines.join('\n')}
                                        style={{ backgroundColor: "#82c482", border: 0, color: "white" }}
                                        onChange={handleChange}
                                        placeholder="Routines"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="exercises">
                                    <Form.Label>Exercises (one per line)</Form.Label>
                                    <FormControl
                                        as="textarea"
                                        name="exercises"
                                        value={workoutPlan.exercises.join('\n')}
                                        style={{ backgroundColor: "#82c482", border: 0, color: "white" }}
                                        onChange={handleChange}
                                        placeholder="Exercises"
                                    />
                                </Form.Group>
                                <Form.Group controlId="sets">
                                    <Form.Label>Sets (one per line)</Form.Label>
                                    <FormControl
                                        as="textarea"
                                        name="sets"
                                        value={workoutPlan.sets.join('\n')}
                                        style={{ backgroundColor: "#82c482", border: 0, color: "white" }}
                                        onChange={handleChange}
                                        placeholder="Sets"
                                    />
                                </Form.Group>
                                <Form.Group controlId="repetitions">
                                    <Form.Label>Repetitions (one per line)</Form.Label>
                                    <FormControl
                                        as="textarea"
                                        name="repetitions"
                                        value={workoutPlan.repetitions.join('\n')}
                                        style={{ backgroundColor: "#82c482", border: 0, color: "white" }}
                                        onChange={handleChange}
                                        placeholder="Repetitions"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" style={{ backgroundColor: "#82c482", border: 0, color: "white", textAlign: "center", marginTop: "25px" }}>
                            Share Workout Plan
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default CreateWorkoutPlan;