import React from 'react';
import { Card } from 'react-bootstrap';

function MyProfileDetails({ userId, name }) { 

    return (
        <Card className="shadow" style={{ marginBottom: "25px", width: "1080px", marginLeft: "25px", backgroundColor: "#0b360b", color: "white", borderRadius: "20px" }}>
            <Card.Body className="text-center">
                <Card.Title><h4>Hello {name}</h4></Card.Title>
            </Card.Body>
        </Card>
    );
}

export default MyProfileDetails;