import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">FitConnect</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/meal-plan-home" className="nav-link">Meal Plans</NavLink>
                    <NavLink to="/workout-plan-home" className="nav-link">Workout Plans</NavLink>
                </Nav>
                <Nav>
                    <NavLink to="/user-profile" className="nav-link">Profile</NavLink>
                    <NavLink to="/logout" className="nav-link">Logout</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;