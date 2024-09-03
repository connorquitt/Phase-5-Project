import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App.js';
import { JobCard } from '../owner/MyJobs.js';

function Worker() {
    const context = useContext(UserContext);
    const user = context.currentUser;
    const [jobs, setJobs] = useState([]);
    const [upcomingJobs, setUpcomingJobs] = useState([]);
    const [isWalker, setIsWalker] = useState(user.pet_walker);
    const [isSitter, setIsSitter] = useState(user.pet_sitter);
    const [showPreferences, setShowPreferences] = useState(false);

    useEffect(() => {
        fetch('/jobs')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const availableJobs = res.filter(job => {
                    if (job.worker_id !== 1) return false;
                    if (isWalker && job.job_type === 'pet_walker') return true;
                    if (isSitter && job.job_type === 'pet_sitter') return true;
                    return false;
                });
                setJobs(availableJobs);

                const userUpcomingJobs = res.filter(job => job.worker_id === user.id && !job.isCompleted);
                setUpcomingJobs(userUpcomingJobs);
            });
    }, [isWalker, isSitter, user.id]);

    const handleClaimJob = (jobId) => {
        const requestData = {
            worker_id: user.id,
        };

        fetch(`/jobs/${jobId}`, {
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
                const claimedJob = jobs.find(job => job.id === jobId);
                setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
                setUpcomingJobs(prevUpcoming => [...prevUpcoming, { ...claimedJob, worker_id: user.id }]);
            })
            .catch(error => {
                console.error('Error claiming job:', error);
            });
    };

    const handleCancelJob = (jobId) => {
        const requestData = {
            worker_id: 1,
        };

        fetch(`/jobs/${jobId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to cancel job');
                }
                const canceledJob = upcomingJobs.find(job => job.id === jobId);
                setUpcomingJobs(prevUpcoming => prevUpcoming.filter(job => job.id !== jobId));
                setJobs(prevJobs => [...prevJobs, { ...canceledJob, worker_id: 1 }]);
            })
            .catch(error => {
                console.error('Error canceling job:', error);
            });
    };

    const handleUpdatePreferences = () => {
        setShowPreferences(!showPreferences);
    };

    const handleSavePreferences = () => {
        const updatedPreferences = {
            pet_walker: isWalker,
            pet_sitter: isSitter,
        };

        fetch(`/workers/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPreferences),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to update preferences');
                }
                setShowPreferences(false);
            })
            .catch(error => {
                console.error('Error updating preferences:', error);
            });
    };

    function ProfileCard(userObj) {
        const user = userObj.userObj
        return (
            <div className='card'>
                {showPreferences ? (
                    <div className="card">
                        <strong style={{fontSize: '20px'}}>Update Preferences:</strong>
                        <br/>
                        <label>
                            Dog-Walker
                            <input
                                type="checkbox"
                                checked={isWalker}
                                onChange={(e) => setIsWalker(e.target.checked)}
                            />
                            <br/>
                        </label>
                        <label>
                            Dog-Sitter
                            <input
                                type="checkbox"
                                checked={isSitter}
                                onChange={(e) => setIsSitter(e.target.checked)}
                            />
                            <br/><br/>
                        </label>
                        <button onClick={handleSavePreferences}>Save Preferences</button>
                    </div>
                ) : (
                    <div>
                        <h1>{user.username}</h1>
                        <strong>Role: </strong> {user.role}<br/>
                        <strong>Pet Walker: </strong> {isWalker ? '✅' : '❌'}<br/>
                        <strong>Pet Sitter: </strong> {isSitter ? '✅' : '❌'}<br/>
                        <button
                            type='button'
                            className='form-submit-button'
                            onClick={handleUpdatePreferences}
                        >{showPreferences ? 'Cancel' : 'Update Job Preferences'}</button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="main-container">
            <h2>Worker Dashboard</h2>
            <ProfileCard userObj={user}/>
            <br/>
            
            <div className="jobs-container">
                <h3>Upcoming Jobs</h3>
                {upcomingJobs.length === 0 ? (
                    <p>No upcoming jobs.</p>
                ) : (
                    <div className="job-cards">
                        {upcomingJobs.map(job => (
                            <div className='job-card-container'>
                                <JobCard job={job} setJobs={setJobs}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="jobs-container">
                <h3>Available Jobs</h3>
                {jobs.length === 0 ? (
                    <p>No jobs available to claim.</p>
                ) : (
                    <div className="job-cards">
                        {jobs.map(job => (
                            <div key={job.id} className="card">
                                <strong>Job Type:</strong> {job.job_type}<br/>
                                <strong>Pet:</strong> {job.pet}<br/>
                                <strong>Arrival Time:</strong> {job.arrival_time}<br/>
                                <button onClick={() => handleClaimJob(job.id)} className="claim-button">Claim Job</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Worker;
