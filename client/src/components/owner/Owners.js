import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App.js';
import DogCards from './DogCards';
import MyJobs from './MyJobs';
import CreateListing from './CreateListing';
import CreatePet from './CreatePet.js';
import BookGroomingAppt from './BookGrooming.js';
import GroomingAppointments from './GroomingAppointments.js';

function Owners() {
    const context = useContext(UserContext);
    const user = context.currentUser;
    
    const [pets, setPets] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [groomers, setGroomers] = useState([]);
    const [appointments, setAppointments] = useState([]);

    console.log('owners context:', user)

    useEffect(() => {
        fetch('/pets')
            .then((res) => res.json())
            .then((res) => setPets(res));
    }, []);

    useEffect(() => {
        fetch('/jobs')
            .then(res => res.json())
            .then(res => setJobs(res));
    }, []);

    useEffect(() => {
        fetch('/groomers')
            .then(res => res.json())
            .then(res => setGroomers(res))
    }, []);

    useEffect(() => {
        fetch('/appointments')
            .then(res => res.json())
            .then(res => setAppointments(res))
    }, [])


    const deletePet = (petId) => {
        fetch(`/pets/${petId}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to delete pet');
            }
            setPets(prevPets => prevPets.filter(pet => pet.id !== petId));
        })
        .catch(error => {
            console.error('Error deleting pet:', error);
        });
    };

    const deleteJob = (jobId) => {
        fetch(`/jobs/${jobId}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to delete job');
            }
            setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        })
        .catch(error => {
            console.error('Error deleting job:', error);
        });
    };

    const updatePet = (updatedPet) => {
        setPets(prevPets => prevPets.map(pet => pet.id === updatedPet.id ? updatedPet : pet));
    };

    const handleDeleteAppointment = (appointmentId) => {
        fetch(`/appointments/${appointmentId}`, { 
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
            } else {
              console.error('Failed to delete the appointment');
            }
          })
          .catch(error => console.error('Error deleting appointment:', error));
      };


    return (
        <div className="main-container">
            <h2>Owners Dashboard</h2>
            <div className="forms-container">
                <CreatePet setPets={setPets} />
                <CreateListing setJobs={setJobs} />
                <BookGroomingAppt groomers={groomers} setAppointments={setAppointments} />
            </div>
            <DogCards pets={pets} deletePet={deletePet} updatePet={updatePet} />
            <MyJobs jobs={jobs} setJobs={setJobs} deleteJob={deleteJob} />
            <GroomingAppointments appointments={appointments} setAppointments={setAppointments} handleDeleteAppointment={handleDeleteAppointment}/>
        </div>
    );
}

export default Owners;
