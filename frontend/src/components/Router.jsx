import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateWorkoutPlan from './workout plan/CreateWorkoutPlan';
import EditWorkoutPlan from './workout plan/EditWorkoutPlan';
import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import { UserProvider } from './user/UserContext';
import Layout from './Layout';
import MyProfile from './user/MyProfile';
import Community from './Home/Community';

function AppRouter() {
    
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route element={<Layout />}>
                    <Route path="/workout-plan-home" element={<Community />} />
                    <Route path="/add-workout-plan" element={<CreateWorkoutPlan />} />
                    <Route path="/update-workout-plan/:id" element={<EditWorkoutPlan />} />
                    <Route path="/user-profile/:userId" element={<MyProfile />} />
                    </Route>
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default AppRouter;