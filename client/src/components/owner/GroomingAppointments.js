import React, { useState, useEffect } from 'react';

function GroomingAppointments({ appointments, handleDeleteAppointment, }) {
  console.log(appointments)


  return (
    <div className="grooming-cards-container">
      {appointments.map(appointment => (
        <div key={appointment.id} className="card">
          <h2>{appointment.pet}</h2>
          <p>Appointment Time: {appointment.appointment_time}</p>
          <p>Groomer: {appointment.groomer}</p>
          <button
            className="delete-appointment-button"
            onClick={() => handleDeleteAppointment(appointment.id)}
          >
            Delete Appointment
          </button>
        </div>
      ))}
    </div>
  );
}

export default GroomingAppointments;
