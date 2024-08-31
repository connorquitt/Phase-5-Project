import React, { useState, useEffect } from 'react';
import './index.css'; // Ensure your CSS file is imported for styling

function GroomingAppointments({ appointments, deleteAppt, }) {


  return (
    <div className="grooming-cards-container">
      {appointments.map(appointment => (
        <div key={appointment.id} className="grooming-card">
          <h2>{appointment.petName}</h2>
          <p>Appointment Time: {appointment.time}</p>
          <p>Groomer: {appointment.groomerName}</p>
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
