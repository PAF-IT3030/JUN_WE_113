import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, InputGroup, Table, Modal } from 'react-bootstrap';
import Like from '../Like';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function ViewWorkoutPlans({ workoutPlans, handleWorkoutPlanCommentChange, addWorkoutPlanComment, newComment, addWorkoutPlanLike }) {
    const [showComments, setShowComments] = useState(false);
    const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState(null);

    const handleShowComments = (workoutPlan) => {
        setSelectedWorkoutPlan(workoutPlan);
        setShowComments(true);
    };

    const handleCloseComments = () => {
        setShowComments(false);
    };

    return (
        <Container style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'scroll' }}>
            <Row xs={1} md={1} lg={1} className="g-4" style={{ marginTop: "25px" }}>
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
                                </div>
                            </Col>
                        </CSSTransition>
                    ))
                ) : (
                    <Col className="text-center">
                        <p>No workout plans available.</p>
                    </Col>
                )}
            </Row>
            {selectedWorkoutPlan && (
                <Modal show={showComments} onHide={handleCloseComments} centered>
                    <Modal.Header closeButton className="bg-dark text-white">
                        <Modal.Title>Comments for {selectedWorkoutPlan.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-dark text-white">
                        {selectedWorkoutPlan.comments.map((comment, index) => (
                            <p key={index}>{comment.text}</p>
                        ))}
                    </Modal.Body>
                    <Modal.Footer className="bg-dark text-white">
                        <Button variant="secondary" onClick={handleCloseComments}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
}

export default ViewWorkoutPlans;