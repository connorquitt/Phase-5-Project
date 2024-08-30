//add services to creating grooming appt
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App.js';
import PetMoreInfo from '../owner/PetMoreInfo';

function Groomers() {
    const context = useContext(UserContext);
    const [moreInfoPetId, setMoreInfoPetId] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [isMoreInfo, setIsMoreInfo] = useState(false);

    const groomer = context.currentUser;

    useEffect(() => {
        fetch('/appointments')
            .then((res) => res.json())
            .then((res) => {
                // Filter appointments to show only those for the current groomer
                const groomerAppointments = res.filter(appointment => appointment.groomer_id === groomer.id);
                setAppointments(groomerAppointments);
            });
    }, [groomer.id]);

    function handleMoreInfo() {
        setIsMoreInfo(!isMoreInfo);
        setMoreInfoPetId({"breed": "Caucasian Shepherd Dog"});
    }

    function handleLessInfo() {
        setIsMoreInfo(!isMoreInfo);
        setMoreInfoPetId(null);
    }

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

    const ApptCard = ({data}) => {
        const appointment = data;
        return (
            <div key={appointment.id} className="card">
                <h1><strong>Pet Name:</strong> {appointment.pet}</h1>
                <p><strong>Appointment Time:</strong> {new Date(appointment.appointment_time).toLocaleString()}</p>
                <p><strong>Groomer:</strong> {appointment.groomer}</p>
                <button
                    className="cancel-button" // Use the cancel-button class for styling
                    onClick={() => handleDelete(appointment.id)}
                >
                    Delete Appointment
                </button>
            </div>
        );
    };

    return (
        <div className="groomers-container">
            <h2>Welcome, {groomer.business_name}</h2>
            <p><strong>Hours:</strong> {groomer.hours}</p>

            <h3>Appointments</h3>
            <div className="appointments-container">
                {appointments.length === 0 ? (
                    <p>No appointments scheduled.</p>
                ) : isMoreInfo ? (
                    <>
                        <PetMoreInfo pet={moreInfoPetId} />
                        <button type='button' onClick={handleLessInfo}>Less Info</button>
                    </>
                ) : (
                    appointments.map((appointment) => (
                        <div key={appointment.id}>
                            <ApptCard data={appointment} />
                            <button onClick={handleMoreInfo}>More Info</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Groomers;
