import React, { useState, useContext } from 'react';
import { DateTime } from 'luxon';
import { UserContext } from '../App';

function CreateListing({ setJobs }) {
    const [notes, setNotes] = useState('');
    const [jobType, setJobType] = useState('');
    const [selectedPet, setSelectedPet] = useState('');
    const [time, setTime] = useState('');

    const context = useContext(UserContext);
    const user = context.currentUser;

    const handleAddListing = (e) => {
        e.preventDefault();

        const formattedTime = DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_SHORT);

        console.log('time', time)
        console.log('luxon time', formattedTime.toLocaleString(DateTime.DATETIME_FULL))

        const requestData = {
            arrival_time: formattedTime,
            isCompleted: false,
            owner_id: user.id,
            worker_id: 1,
            pet_id: parseInt(selectedPet),
            job_type: jobType,
        };

        console.log('create job request data', requestData);

        fetch('/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(res => res.json())
            .then(res => {
                setJobs(prevJobs => [...prevJobs, res]);
                setJobType('');
                setSelectedPet('');
                setNotes('');
                setTime('');
            })
            .catch(error => {
                console.error('Error adding job:', error);
            });
    };

    return (
        <div className="create-listing-container">
            <h3>Create a New Job Listing</h3>
            <form onSubmit={handleAddListing}>
                <label>
                    Job Type:
                    <select 
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Select...</option>
                        <option value="pet_walker">Walker</option>
                        <option value="pet_sitter">Sitter</option>
                    </select>
                </label>
                <label>
                    Select Pet:
                    <select
                        value={selectedPet}
                        onChange={(e) => setSelectedPet(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Select...</option>
                        {user.pets.map((pet) => (
                            <option value={pet.id} key={pet.id}>{pet.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Additional Notes:
                    <input 
                        type='text'
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="form-input"
                    />
                </label>
                <label>
                    Select Date:
                    <input
                        type="datetime-local"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="form-input"
                    />
                </label>
                <button type="submit" className="form-submit-button">Submit</button>
            </form>
        </div>
    );
}

export default CreateListing;
