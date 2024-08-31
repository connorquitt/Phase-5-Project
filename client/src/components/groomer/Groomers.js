//add services to creating grooming appt
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App.js';
import GroomerCard from './GroomerCard.js';
import PetMoreInfo from '../owner/PetMoreInfo';

function Groomers() {
    const context = useContext(UserContext);
    const [appointments, setAppointments] = useState([]);

    const groomer = context.currentUser;

    useEffect(() => {
        fetch('/appointments')
            .then((res) => res.json())
            .then((res) => {
                const groomerAppointments = res.filter(appointment => appointment.groomer_id === groomer.id);
                setAppointments(groomerAppointments);
            });
    }, [groomer.id]);

    function handleDelete(appointmentId) {
        fetch(`/appointments/${appointmentId}`, {
            method: 'DELETE',
        })
        .then((res) => {
            if (res.ok) {
                // Remove the appointment from the state
                setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
            } else {
                console.error('Failed to delete the appointment');
            }
        });
    }

    return (
        <div className='main-container'>
                <h1>{groomer.business_name}'s Grooming Dashboard</h1>
            <div>
                <h2>Upcoming Appointments:</h2>
                {appointments.map((appointment) => {
                return (
                <div className='pet-card-container'>
                    <GroomerCard appointment={appointment} handleDelete={handleDelete} />
                </div>
                )
                })}
            </div>
        </div>
    );
}

export default Groomers;





