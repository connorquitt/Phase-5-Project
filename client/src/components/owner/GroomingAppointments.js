import React from 'react';


function GroomingAppointments({ appointments, handleDeleteAppointment }) {

  const GroomingCard = ({ appointment }) => {

    return (
      <div className='card'>
        <h2>{appointment.pet}</h2>
        <p>Appointment Time: {appointment.appointment_time}</p>
        <p>Groomer: {appointment.groomer}</p>
        <button
          className="cancel-button"
          onClick={() => handleDeleteAppointment(appointment.id)}
        >
          Delete Appointment
        </button>
      </div>
    )
  }


  if (!appointments) {
    return <h1>Loading Appointments...</h1>
  }else {
    return (
      <>
        <h1>Grooming Appointments:</h1>
        <div className="dog-cards-container">
          {appointments.map(appointment => (
            <div className='pet-card-container' key={appointment.id}>
                <GroomingCard appointment={appointment} handleDeleteAppointment={handleDeleteAppointment}/>
            </div>
          ))}
        </div>
        </>
      );
  }
}

export default GroomingAppointments;
