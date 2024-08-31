// src/components/MyJobs.js

import React from 'react';

function MyJobs({ jobs, user, deleteJob }) {
    if (!jobs.length) {
        return <h2>Loading jobs...</h2>;
    }

    const userPetIds = new Set(user.pets.map(pet => pet.id));
    const filteredJobs = jobs.filter(job => userPetIds.has(job.pet_id));

    return (
        <div>
            {filteredJobs.length === 0 ? (
                <p>No jobs found for your pets.</p>
            ) : (
                <ul>
                    {filteredJobs.map(job => (
                        <li key={job.id} className='card'>
                            <strong>Job Type:</strong> {job.job_type}<br />
                            <strong>Pet:</strong> {job.pet}<br />
                            <strong>Arrival Time:</strong> {job.arrival_time}<br />
                            <strong>Worker:</strong> {job.worker ? job.worker : 'none'}
                            <button onClick={() => deleteJob(job.id)} className="delete-button">Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyJobs;
