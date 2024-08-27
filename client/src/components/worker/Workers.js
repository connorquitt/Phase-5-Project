// Workers.js
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App.js';

function Worker() {
    const context = useContext(UserContext);
    const user = context.currentUser;
    const [jobs, setJobs] = useState([]);
    const [isWalker, setIsWalker] = useState(user.pet_walker);
    const [isSitter, setIsSitter] = useState(user.pet_sitter);

    useEffect(() => {
        fetch('/worker_pets')
            .then(res => res.json())
            .then(res => {
                // Filter jobs with worker_id of 1
                console.log(res);
                const filteredJobs = res.filter(job => job.worker_id === 1);
                setJobs(filteredJobs);
            });
    }, []);

    const handleClaimJob = (jobId) => {
        const requestData = {
            worker_id: user.id,
        };

        fetch(`/worker_pets/${jobId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to claim job');
                }
                // Remove the claimed job from the state
                setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
            })
            .catch(error => {
                console.error('Error claiming job:', error);
            });
    };

    return (
        <div className="main-container">
            <button onClick={console.log("walker:", isWalker, "sitter:", isSitter)}>state check</button>
            <h2>Worker Dashboard</h2>
            <h1>{user.username}</h1>
            <div className="worker-roles">
                <label>
                    <input 
                        value={isWalker}
                        type="checkbox" 
                        
                        onChange={(e) => setIsWalker(e.target.value)}
                    />
                    Dog-Walker
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        checked={isSitter} 
                        onChange={(e) => setIsSitter(e.target.value)}
                    />
                    Dog-Sitter
                </label>
            </div>
            <div className="jobs-container">
                <h3>Available Jobs</h3>
                {jobs.length === 0 ? (
                    <p>No jobs available to claim.</p>
                ) : (
                    <div className="job-cards">
                        {jobs.map(job => (
                            <div key={job.id} className="job-card">
                                <strong>Job Type:</strong> {job.job_type}<br />
                                <strong>Pet:</strong> {job.pet}<br />
                                <strong>Arrival Time:</strong> {job.arrival_time}<br />
                                <button onClick={() => handleClaimJob(job.id)} className="claim-button">Claim</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Worker;


        