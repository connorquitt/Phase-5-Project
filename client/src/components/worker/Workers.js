// Workers.js
//Brings the user to a page showing their information including what type of jobs they’re able to take and any upcoming jobs.
//Navbar with links to Listings and Jobs.
    //Listings: Shows all job listings that the current logged in user is able to accept
    //Jobs: Shows all the previous jobs the current user has completed as well as any upcoming jobs, there is a button to show More Info for both past and upcoming jobs
        //More Info: will have all the given information for the previous job including pet and owner info, scheduled time for the job, and any extra information that was given at the time of the job
        import React, { useContext, useEffect, useState } from 'react';
        import { UserContext } from '../App.js';
        
        function Worker() {
            const context = useContext(UserContext);

            const [username, setUsername] = useState('');
            const [password, setPassword] = useState('');
            const [petWalker, setPetWalker] = useState(false);
            const [petSitter, setPetSitter] = useState(false);
            const [jobs, setJobs] = useState([]);
        
            const user = context.currentUser;
        
            useEffect(() => {
                fetch('/worker_pets')
                    .then(res => res.json())
                    .then(res => {
                        // Filter jobs with worker_id of 1
                        console.log(res)
                        const filteredJobs = res.filter(job => job.worker_id === 1);
                        setJobs(filteredJobs);
                    });
            }, []);
        
            const handleAddWorker = (e) => {
                e.preventDefault();
        
                const requestData = {
                    username: username,
                    password: password,
                    pet_walker: petWalker,
                    pet_sitter: petSitter,
                };
        
                fetch('/workers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                })
                    .then(res => res.json())
                    .then(res => {
                        console.log('Worker added:', res);
                        // Optionally clear the form fields
                        setUsername('');
                        setPassword('');
                        setPetWalker(false);
                        setPetSitter(false);
                    })
                    .catch(error => {
                        console.error('Error adding worker:', error);
                    });
            };
        
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
                    <h2>Worker Dashboard</h2>
                    <div className="create-worker-container">
                        <h3>Create a New Worker</h3>
                        <form onSubmit={handleAddWorker}>
                            <label>
                                Username:
                                <input 
                                    type='text'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-input"
                                />
                            </label>
                            <label>
                                Password:
                                <input 
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input"
                                />
                            </label>
                            <label>
                                Pet Walker:
                                <input 
                                    type='checkbox'
                                    checked={petWalker}
                                    onChange={(e) => setPetWalker(e.target.checked)}
                                    className="form-checkbox"
                                />
                            </label>
                            <label>
                                Pet Sitter:
                                <input 
                                    type='checkbox'
                                    checked={petSitter}
                                    onChange={(e) => setPetSitter(e.target.checked)}
                                    className="form-checkbox"
                                />
                            </label>
                            <button type="submit" className="form-submit-button">Submit</button>
                        </form>
                    </div>
                    <div className="jobs-container">
                        <h3>Available Jobs</h3>
                        {jobs.length === 0 ? (
                            <p>No jobs available to claim.</p>
                        ) : (
                            <ul>
                                {jobs.map(job => (
                                    <li key={job.id} className="job-card">
                                        <strong>Job Type:</strong> {job.job_type}<br />
                                        <strong>Pet:</strong> {job.pet}<br />
                                        <strong>Arrival Time:</strong> {job.arrival_time}<br />
                                        <button onClick={() => handleClaimJob(job.id)} className="claim-button">Claim</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            );
        }
        
        export default Worker;
        