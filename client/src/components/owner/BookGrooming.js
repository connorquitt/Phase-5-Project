// src/components/BookGroomingAppt.js

import React, { useState } from 'react';

function BookGroomingAppt({ groomers, user, setAppointments }) {
    const [groomer, setGroomer] = useState('');
    const [selectedPet, setSelectedPet] = useState('');
    const [time, setTime] = useState('');
    const [service, setService] = useState('');

    const handleAddAppointment = (e) => {
        e.preventDefault();

        const requestData = {
            appointment_time: time,
            groomer_id: parseInt(groomer),
            pet_id: parseInt(selectedPet),
            owner_id: user.id,
            service: service,
            isCompleted: false,
        };

        console.log('book appt request data', requestData)

        fetch('/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(res => res.json())
        .then(res => {
            setAppointments(prevAppts => [...prevAppts, res])
            setGroomer('');
            setSelectedPet('');
            setTime('');
            setService('');
        })
        .catch(error => {
            console.error('Error adding grooming appointment:', error);
        });
    };

    return (
        <div className="book-grooming-container">
            <h3>Book a Grooming Appointment</h3>
            <form onSubmit={handleAddAppointment}>
                <label>
                    Select Groomer:
                    <select
                        value={groomer}
                        onChange={(e) => setGroomer(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Select...</option>
                        {groomers.map(groomer => (
                            <option value={groomer.id} key={groomer.id}>{groomer.username}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Select Pet:
                    <select
                        value={selectedPet}
                        onChange={(e) => setSelectedPet(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Select...</option>
                        {user.pets.map(pet => (
                            <option value={pet.id} key={pet.id}>{pet.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Select Service:
                    <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className='form-select'
                        >
                            <option value=''>Select...</option>
                            <option value=''>1</option>
                            <option value=''>2</option>
                            <option value=''>3</option>
                            <option value=''>4</option>
                            <option value=''>5</option>
                        </select>
                </label>
                <label>
                    Select Date:
                    <input
                        type="datetime-local"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="form-input"
                    />
                </label>
                <button type="submit" className="form-submit-button">Book Appointment</button>
            </form>
        </div>
    );
}

export default BookGroomingAppt;
