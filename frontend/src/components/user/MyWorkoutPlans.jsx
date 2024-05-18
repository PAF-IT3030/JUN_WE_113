import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Table } from 'react-bootstrap';
import Like from '../Like';
import CommentsModal from '../CommentsModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function MyWorkoutPlans({ workoutPlans, addWorkoutPlanLike, addWorkoutPlanComment, handleWorkoutPlanCommentChange, newComment }) {
    const [showComments, setShowComments] = useState(false);
    const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState(null);
    const navigate = useNavigate();

    const handleShowComments = (workoutPlan) => {
        setSelectedWorkoutPlan(workoutPlan);
        setShowComments(true);
    };

    const handleCloseComments = () => {
        setShowComments(false);
    };

    const handleUpdate = (id) => {
        navigate(`/update-workout-plan/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this workout plan?')) {
            try {
                await axios.delete(`http://localhost:8080/api/workout-plans/${id}`);
                alert('Workout Plan Deleted Successfully!');
                navigate('/workout-plan-home');
            } catch (error) {
                console.error('Error deleting workout plan:', error);
            }
        }
    };

    return (
        <Container style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'scroll' }}>
            <Row xs={1} md={2} lg={3} className="g-4" style={{ marginTop: "25px" }}>
                {Array.isArray(workoutPlans) && workoutPlans.length > 0 ? (
                    workoutPlans.map(workoutPlan => (
                        <CSSTransition key={workoutPlan.id} timeout={500} classNames="item">
                            <Col>
                                <div className="p-3 mb-4 bg-dark text-white">
                                    <h3 className="fw-bold text-center mb-4">{workoutPlan.title}</h3>
                                    <p>{workoutPlan.description}</p>
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>Exercises</th>
                                                <th>Sets</th>
                                                <th>Repetitions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {workoutPlan.exercises.map((exercise, index) => (
                                                <tr key={index}>
                                                    <td>{exercise}</td>
                                                    <td>{workoutPlan.sets[index]}</td>
                                                    <td>{workoutPlan.repetitions[index]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <Like onClick={() => addWorkoutPlanLike(workoutPlan.id)} likes={workoutPlan.likes} />
                                        <Button onClick={() => handleShowComments(workoutPlan)} variant="success">
                                            View Comments
                                        </Button>
                                    </div>
                                    <InputGroup className="mt-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Create a comment..."
                                            value={newComment[`workoutPlan_${workoutPlan.id}`] || ''}
                                            onChange={e => handleWorkoutPlanCommentChange(workoutPlan.id, e.target.value)}
                                        />
                                        <Button onClick={() => addWorkoutPlanComment(workoutPlan.id)} variant="outline-secondary">
                                            Comment
                                        </Button>
                                    </InputGroup>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <Button variant="primary" onClick={() => handleUpdate(workoutPlan.id)}>
                                            <FaEdit />
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(workoutPlan.id)}>
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </CSSTransition>
                    ))
                ) : (
                    <Col className="d-flex justify-content-center">
                        <p>No workout plans available.</p>
                    </Col>
                )}
            </Row>
            {selectedWorkoutPlan && (
                <CommentsModal
                    show={showComments}
                    handleClose={handleCloseComments}
                    comments={selectedWorkoutPlan.comments}
                    title={selectedWorkoutPlan.title}
                />
            )}
        </Container>
    );
}

export default MyWorkoutPlans;