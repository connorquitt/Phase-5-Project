import React, { useState, useContext } from 'react';
import { UserContext } from '../App';


function GroomingCard({ appointment, handleDeleteAppointment, setAppointments }) {
  
  const [isCompleted, setIsCompleted] = useState(appointment.isCompleted);

  const handleIsCompleted = (apptId) => {

    const requestData = {
        isCompleted: !isCompleted,
    };

    fetch(`/appointments/${apptId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to mark appointment as completed');
            }
            return res.json();
        })
        .then(updatedAppt => {
            setAppointments(prevAppts => prevAppts.filter(appt => appt.id !== apptId));
        })
        .catch(error => {
            console.error('Error marking appointment as completed:', error);
        });
};

  return (
    <div className='card'>
      <h1><strong>Pet Name: </strong> {appointment.pet}</h1>
      <strong>Appointment Time: </strong> {appointment.appointment_time} <br/>
      <strong>Groomer: </strong>{appointment.groomer}<br />
      <strong>isCompleted:</strong> {<button onClick={(e) => handleIsCompleted(appointment.id)} className='cancel-button' style={appointment.isCompleted ? {background: 'green'} : {background: 'hotpink'}}>{appointment.isCompleted ? 'True' : 'False'}</button>}<br />
      <button
        type='button'
        className="delete-button"
        onClick={() => handleDeleteAppointment(appointment.id)}
      >Delete Appointment</button>
    </div>
  )
}

function GroomingAppointments({ appointments, setAppointments, handleDeleteAppointment }) {

  const context = useContext(UserContext);
  const user = context.currentUser;

  const filteredAppointments = appointments.filter(appt => appt.owner_id === user.id && !appt.isCompleted)

  if (!filteredAppointments) {
    return <h1>Loading Appointments...</h1>
  }
    return (
      <>
        <h1>Grooming Appointments:</h1>
        <div className="dog-cards-container">
          {filteredAppointments.map(appointment => (
            <div className='pet-card-container' key={appointment.id}>
                <GroomingCard appointment={appointment} handleDeleteAppointment={handleDeleteAppointment} setAppointments={setAppointments}/>
            </div>
          ))}
        </div>
        </>
      );
}

export default GroomingAppointments;
export {GroomingCard}