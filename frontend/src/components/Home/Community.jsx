import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Container, Row, Tab } from 'react-bootstrap';
import ViewWorkoutPlans from './ViewWorkoutPlans';

function Community() {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [newComment, setNewComment] = useState({});

    useEffect(() => {

        fetchWorkoutPlans();

        console.log("User ID:", localStorage.getItem("userId"));
    }, []);


    const fetchWorkoutPlans = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/workout-plans');
            setWorkoutPlans(response.data);
        } catch (error) {
            console.error('Error fetching workout plans:', error);
        }
    };

   


    const addWorkoutPlanLike = async (workoutPlanId) => {
        try {
            await axios.post(`http://localhost:8080/api/workout-plans/${workoutPlanId}/like`);
            fetchWorkoutPlans(); // Refresh workout plans to show updated likes
        } catch (error) {
            console.error('Error adding workout plan like:', error);
        }
    };

    

   

    const handleWorkoutPlanCommentChange = (workoutPlanId, text) => {
        setNewComment({ ...newComment, [`workoutPlan_${workoutPlanId}`]: text });
    };




    const addWorkoutPlanComment = async (workoutPlanId) => {
        if (newComment[`workoutPlan_${workoutPlanId}`]) {
            try {
                await axios.post(`http://localhost:8080/api/workout-plans/${workoutPlanId}/comment`, { text: newComment[`workoutPlan_${workoutPlanId}`] });
                fetchWorkoutPlans(); // Refresh workout plans to show new comment
                setNewComment({ ...newComment, [`workoutPlan_${workoutPlanId}`]: '' }); // Clear input field after submission
            } catch (error) {
                console.error('Error adding workout plan comment:', error);
            }
        }
    };

    return (
        <Container fluid style={{marginLeft: "47px"}}>
            <Row>
                <Col>
                    <Tab.Container id="home-tabs" defaultActiveKey="view-workout-plans">
                        
                        <Tab.Content>
                            <Tab.Pane eventKey="view-workout-plans">
                                <div style={{ overflowX: 'auto' }}>
                                    <ViewWorkoutPlans
                                        workoutPlans={workoutPlans}
                                        handleWorkoutPlanCommentChange={handleWorkoutPlanCommentChange}
                                        addWorkoutPlanComment={addWorkoutPlanComment}
                                        newComment={newComment}
                                        addWorkoutPlanLike={addWorkoutPlanLike}
                                    />
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Community;