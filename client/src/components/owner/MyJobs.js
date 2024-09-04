import React, { useContext, useState } from 'react';
import { UserContext } from '../App';

function JobCard({ job, deleteJob, setJobs }) {
    const [isCompleted, setIsCompleted] = useState(job.isCompleted);

    const handleIsCompleted = (jobId) => {
        const requestData = {
            isCompleted: !isCompleted,
        };

        fetch(`/jobs/${jobId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to mark job as completed');
                }
                return res.json();
            })
            .then(setIsCompleted(!isCompleted))
            
            .catch((error) => {
                console.error('Error marking job as completed:', error);
            });
    };

    return (
        <div className="card">
            <strong>Job Type:</strong> {job.job_type}
            <br />
            <strong>Pet:</strong> {job.pet}
            <br />
            <strong>Arrival Time:</strong> {job.arrival_time}
            <br />
            <strong>Worker:</strong> {job.worker ? job.worker : 'none'}
            <br />
            <strong>isCompleted:</strong>
            <button
                onClick={() => handleIsCompleted(job.id)}
                className="form-submit-button"
                style={
                    isCompleted
                        ? { background: 'green' }
                        : { background: 'hotpink' }
                }
            >
                {isCompleted ? 'True' : 'False'}
            </button>
            <br />
            {isCompleted ? null : (
                <button
                    onClick={() => deleteJob(job.id)}
                    className="cancel-button"
                >
                    Cancel Listing
                </button>
            )}
        </div>
    );
}



function MyJobs({ jobs, setJobs, deleteJob }) {

    const context = useContext(UserContext);
    const user = context.currentUser;

    if (!jobs.length) {
        return <h2>Loading jobs...</h2>;
    }


    const userPetIds = new Set(user.pets.map(pet => pet.id));
    const filteredJobs = jobs.filter(job => userPetIds.has(job.pet_id) && !job.isCompleted);

    return (
        <>
            <h1>Upcoming Jobs:</h1>
            <div className='job-cards-container'>
                {filteredJobs.length === 0 ? (
                    <p>No jobs found for your pets.</p>
                ) : (
                    filteredJobs.map(job => (
                        
                            <JobCard job={job} setJobs={setJobs} deleteJob={deleteJob}/>
                       
                    ))
                )}
            </div>
        </>
    );
}

export default MyJobs;
export {JobCard}
