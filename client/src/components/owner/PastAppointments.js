import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../App';
import { GroomingCard } from './GroomingAppointments';

function PastAppointments() {
    const [appointments, setAppointments] = useState();

    const context = useContext(UserContext);
    const user = context.currentUser;

    useEffect(() => {
        fetch('/appointments')
            .then(res => res.json())
            .then(res => setAppointments(res))
            .catch(err => console.error('Failed to fetch appointments:', err));
    }, []);

    if (!appointments) {
        return <h1>Loading...</h1>;
    }

    const filteredAppointments = appointments.filter(appointment => appointment.owner_id === user.id && appointment.isCompleted);

    return (
        <>
            <h1>Past Appointments:</h1>
            <div className='appointment-cards-container'>
                {filteredAppointments.length === 0 ? (
                    <p>No completed appointments found for your pets.</p>
                ) : (
                    filteredAppointments.map(appointment => (
                        <div key={appointment.id} className='appointment-card-container'>
                            <GroomingCard appointment={appointment} setAppointments={setAppointments} />
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default PastAppointments;
