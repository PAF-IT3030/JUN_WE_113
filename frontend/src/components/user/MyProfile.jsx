/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Nav, Tab } from 'react-bootstrap';
import { useUser } from './UserContext';
import MyProfileDetails from './MyProfileDetails';
import MyWorkoutPlans from './MyWorkoutPlans';

function MyProfile() {
    const [mealPlans, setMealPlans] = useState([]);
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [newComment, setNewComment] = useState({});
    const { userId, name } = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMealPlans();
        fetchWorkoutPlans();
    }, []);

    useEffect(() => {
        console.log("User ID:", userId);
        console.log("User Name:", name);
    }, [userId, name]);

    useEffect(() => {
        setLoading(false); // Set loading to false once userId is fetched
    }, [userId]);

    const fetchMealPlans = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/meal-plans/user/${userId}`);
            setMealPlans(response.data);
        } catch (error) {
            console.error('Error fetching meal plans:', error);
        }
    };

    const fetchWorkoutPlans = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/workout-plans/user/${userId}`);
            setWorkoutPlans(response.data);
        } catch (error) {
            console.error('Error fetching workout plans:', error);
        }
    };

    const addMealPlanLike = async (mealPlanId) => {
        try {
            await axios.post(`http://localhost:8080/api/meal-plans/${mealPlanId}/like`);
            fetchMealPlans();
        } catch (error) {
            console.error('Error adding meal plan like:', error);
        }
    };

    const addWorkoutPlanLike = async (workoutPlanId) => {
        try {
            await axios.post(`http://localhost:8080/api/workout-plans/${workoutPlanId}/like`);
            fetchWorkoutPlans();
        } catch (error) {
            console.error('Error adding workout plan like:', error);
        }
    };

    const handleMealPlanCommentChange = (mealPlanId, text) => {
        setNewComment({ ...newComment, [`mealPlan_${mealPlanId}`]: text });
    };

    const handleWorkoutPlanCommentChange = (workoutPlanId, text) => {
        setNewComment({ ...newComment, [`workoutPlan_${workoutPlanId}`]: text });
    };

    const addMealPlanComment = async (mealPlanId) => {
        if (newComment[`mealPlan_${mealPlanId}`]) {
            try {
                await axios.post(`http://localhost:8080/api/meal-plans/${mealPlanId}/comment`, { text: newComment[`mealPlan_${mealPlanId}`] });
                fetchMealPlans();
                setNewComment({ ...newComment, [`mealPlan_${mealPlanId}`]: '' });
            } catch (error) {
                console.error('Error adding meal plan comment:', error);
            }
        }
    };

    const addWorkoutPlanComment = async (workoutPlanId) => {
        if (newComment[`workoutPlan_${workoutPlanId}`]) {
            try {
                await axios.post(`http://localhost:8080/api/workout-plans/${workoutPlanId}/comment`, { text: newComment[`workoutPlan_${workoutPlanId}`] });
                fetchWorkoutPlans(); 
                setNewComment({ ...newComment, [`workoutPlan_${workoutPlanId}`]: '' });
            } catch (error) {
                console.error('Error adding workout plan comment:', error);
            }
        }
    };

    return (
        <Tab.Container id="home-tabs" defaultActiveKey="view-workout-plans" style={{marginLeft: "25px"}}>
            <MyProfileDetails userId={userId} name={name} />
            <Nav variant="tabs">
                <Nav.Item>
                    <Nav.Link eventKey="view-workout-plans">My Workout Plans</Nav.Link>
                </Nav.Item>
                
            </Nav>
            <Tab.Content>
                <Tab.Pane eventKey="view-workout-plans">
                    <MyWorkoutPlans
                        workoutPlans={workoutPlans}
                        addWorkoutPlanLike={addWorkoutPlanLike}
                        addWorkoutPlanComment={addWorkoutPlanComment}
                        handleWorkoutPlanCommentChange={handleWorkoutPlanCommentChange}
                        newComment={newComment}
                    />
                </Tab.Pane>
            </Tab.Content>  
        </Tab.Container>
    );
}

export default MyProfile;