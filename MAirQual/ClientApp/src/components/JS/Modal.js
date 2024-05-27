import React from 'react';
import '../CSS/modal.css';

const Modal = ({ show, handleClose, children, message }) => {
    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <span className="close-button" onClick={handleClose}>&times;</span>
                {children}
                {message && <p className={message.type}>{message.text}</p>}
            </div>
        </div>
    );
};

export default Modal;
