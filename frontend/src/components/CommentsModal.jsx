import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function CommentsModal({ show, handleClose, comments, title }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{backgroundColor: "#82c482", color: "white"}}>
                <Modal.Title>Comments for {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: "#82c482", color: "white"}}>
                {comments.map((comment, index) => (
                    <p key={index}>{comment.text}</p>
                ))}
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: "#82c482", color: "white"}}>
                <Button variant="secondary" onClick={handleClose} style={{backgroundColor: "#0b360b", color: "white", border: 0}}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CommentsModal;