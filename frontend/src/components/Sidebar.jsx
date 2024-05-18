import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from './user/UserContext';
import { Container, Nav } from 'react-bootstrap';
import './Sidebar.css';

function Sidebar() {
    const { user, userId, setUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedName = localStorage.getItem('name');
        if (storedUserId) {
            setUser({ id: storedUserId });
            console.log("Header userID: " + storedUserId);
            console.log("Header Name: " + storedName);
        }
    }, [setUser]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        navigate('/');
    };

    return (
        <div className="sidebar">
            <Container fluid className="p-0">
                <h5 className="sidebar-header">My App</h5>
                <Nav className="flex-column">
                <NavLink to="/workout-plan-home" className="nav-link" style={{backgroundColor: "#82c482", color: "white", marginTop: "25px"}}>
                        Community
                    </NavLink>
                <NavLink to="/add-workout-plan" className="nav-link" style={{backgroundColor: "#82c482", color: "white", marginTop: "25px"}}>
                        Share My Workout
                    </NavLink>
                    
                    {user ? (
                        <>
                            <NavLink to={`/user-profile/${userId}`} className="nav-link" style={{backgroundColor: "#82c482", color: "white", marginTop: "25px"}}>
                                My Profile
                            </NavLink>
                            <button onClick={handleLogout} className="nav-link" style={{backgroundColor: "#82c482", color: "white", marginTop: "250px"}}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink to="/" className="nav-link">
                            Sign In
                        </NavLink>
                    )}
                </Nav>
            </Container>
        </div>
    );
}

export default Sidebar;