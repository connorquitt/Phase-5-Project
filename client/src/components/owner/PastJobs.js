import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../App';
import { JobCard } from './MyJobs';

function PastJobs() {
    const [jobs, setJobs] = useState();

    const context = useContext(UserContext);
    const user = context.currentUser;

    useEffect(() => {
        fetch('/jobs')
            .then(res => res.json())
            .then(res => setJobs(filteredJobs(res)));
    }, []);

    function filteredJobs(jobs) {
        const userType = user.role
        const id = 
            userType === 'owner'
            ? 'owner_id'
            : userType === 'worker'
            ? 'worker_id'
            : 'groomer_id'
        const filter = jobs.filter(job => job[id] === user.id && job.isCompleted)
        
        console.log(filter)
        return filter
    }

    
    if (!jobs) {
        return <h1>Loading...</h1>
    }
    console.log('jobs list pre filter:', jobs)
    {filteredJobs(jobs)}
    console.log('filtered jobs', filteredJobs)
    return (
        <>
            <h1>Past Jobs:</h1>
            <div className='job-cards-container'>
                {jobs.length === 0 ? (
                    <p>No completed jobs found for your pets.</p>
                ) : (
                    jobs.map(job => (
                        <div key={job.id} className='job-card-container'>
                            <JobCard job={job} setJobs={setJobs}/>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default PastJobs;
