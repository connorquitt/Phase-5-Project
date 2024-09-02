import React, { useContext } from 'react';
import { UserContext } from '../App';

function MyJobs({ jobs, deleteJob }) {

    const context = useContext(UserContext);
    const user = context.currentUser;

    if (!jobs.length) {
        return <h2>Loading jobs...</h2>;
    }

    const userPetIds = new Set(user.pets.map(pet => pet.id));
    const filteredJobs = jobs.filter(job => userPetIds.has(job.pet_id));

    return (
        <>
        <h1>Upcoming Jobs:</h1>
        <div className='dog-cards-container'>
            {filteredJobs.length === 0 ? (
                <p>No jobs found for your pets.</p>
            ) : (
                <>
                    {filteredJobs.map(job => (
                        <div key={job.id} className='pet-card-container'>
                            <div className='card'>
                                <strong>Job Type:</strong> {job.job_type}<br />
                                <strong>Pet:</strong> {job.pet}<br />
                                <strong>Arrival Time:</strong> {job.arrival_time}<br />
                                <strong>Worker:</strong> {job.worker ? job.worker : 'none'}<br />
                                <button onClick={() => deleteJob(job.id)} className="cancel-button">Cancel Listing</button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
        </>
    );
}

export default MyJobs;
