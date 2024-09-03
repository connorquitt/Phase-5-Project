import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App.js';
import GroomerCard from './GroomerCard.js';

function GroomerHomePage() {
    const context = useContext(UserContext);
    const groomer = context.currentUser;
    const [appointments, setAppointments] = useState([]);
    const [businessName, setBusinessName] = useState(groomer.business_name);
    const [hours, setHours] = useState(groomer.hours);
    const [address, setAddress] = useState(groomer.address);
    const [isEditing, setIsEditing] = useState(false);

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

    function handleEditProfile() {
        setIsEditing(!isEditing);
    }

    function handleUpdateProfile() {
        const requestData = {
            business_name: businessName,
            address: address,
            hours: hours
        }

        fetch(`/groomers/${groomer.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setIsEditing(false);
            });
    }

    // Moved GroomerProfileCard component's logic into the main component directly
    return (
        <div className='main-container'>
            <h1>Grooming Dashboard</h1>
            <div className='card'>
                {isEditing ? (
                    <>
                        <h1>Update Profile</h1>
                        <label>
                            Business Name:
                            <input
                                type='text'
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className='form-input'
                            />
                        </label>
                        <br/>
                        <br/>
                        <label>
                            Address:
                            <input
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder={groomer.address}
                            />
                        </label>
                        <br/>
                        <br/>
                        <label>
                            Hours:
                            <input
                                type='text'
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                placeholder={groomer.hours}
                            />
                        </label>
                        <br/>
                        <br/>
                        <button
                            type='button'
                            className={isEditing ? 'cancel-button' : 'form-submit-button'}
                            onClick={handleEditProfile}
                        >{isEditing ? 'Cancel' : 'Update Profile Info'}</button>
                        <button
                            type='button'
                            className='form-submit-button'
                            onClick={handleUpdateProfile}
                        >Update Info</button>
                    </>
                ) : (
                    <>
                        <h1>{businessName}</h1>
                        <strong>Address: </strong> {address} <br/><br/>
                        <strong>Hours: </strong> {hours} <br/><br/>
                        <button
                            type='button'
                            className='form-submit-button'
                            onClick={handleEditProfile}
                        >Update Profile Info</button>
                    </>
                )}
            </div>
            <div>
                <h2>Upcoming Appointments:</h2>
                {appointments.map((appointment) => (
                    <div className='pet-card-container' key={appointment.id}>
                        <GroomerCard appointment={appointment} handleDelete={handleDelete} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GroomerHomePage;
