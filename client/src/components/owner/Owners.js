// src/components/Owners.js

import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App.js';
import PetCard from './PetCard';
import DogCards from './DogCards';
import MyJobs from './MyJobs';
import CreateListing from './CreateListing';
import CreatePet from './CreatePet';
import BookGroomingAppt from './BookGrooming.js';

function Owners() {
    const context = useContext(UserContext);
    
    const [pets, setPets] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [groomers, setGroomers] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const user = context.currentUser;

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
            .then(res => filterAppts(res))
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

    const filterAppts = (appointments) => {
        appointments.map((appointment) => {
            if (appointment.petId == user.petId) {
                console.log('fail:', {appointment})
            }else {
                console.log('else:', {appointment})
            }
        })
    }

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
        fetch(`/appointments/${appointmentId}`, { // Replace with your actual endpoint
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
                <CreateListing user={user} setJobs={setJobs} />
                <CreatePet user={user} setPets={setPets} />
                <BookGroomingAppt groomers={groomers} user={user} />
            </div>
            <DogCards pets={pets} user={user} deletePet={deletePet} updatePet={updatePet} />
            <MyJobs jobs={jobs} user={user} deleteJob={deleteJob} />

        </div>
    );
}

export default Owners;
