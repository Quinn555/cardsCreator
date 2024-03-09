import React, { useState } from "react";

function CardCreation() {
    const [formData, setFormData] = useState({
        cardName: ''
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error('Error creating card:', err));
    }

    return (
        <div className="registerDiv">
            <p>hi there friend</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="cardName" placeholder="Enter Card Name" onChange={handleInputChange} required/>
                <input type="submit" id="createUserButton" value="Create Card"/>
            </form>
        </div>
    );
}

export default CardCreation;
