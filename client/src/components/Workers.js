// Workers.js
//Brings the user to a page showing their information including what type of jobs they’re able to take and any upcoming jobs.
//Navbar with links to Listings and Jobs.
    //Listings: Shows all job listings that the current logged in user is able to accept
    //Jobs: Shows all the previous jobs the current user has completed as well as any upcoming jobs, there is a button to show More Info for both past and upcoming jobs
        //More Info: will have all the given information for the previous job including pet and owner info, scheduled time for the job, and any extra information that was given at the time of the job


        import React, {useContext} from 'react';
        import { NavLink } from 'react-router-dom';
        import UserContext from './UseContext';
        
        function Workers() {
            const context = useContext(UserContext);
        
            return <h2>Workers Dashboard</h2>;
        }
        
        export default Workers;