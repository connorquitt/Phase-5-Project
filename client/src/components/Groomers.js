// Groomers.js
//Brings the user to a page showing their business info and any bookings they have coming up.
//Navbar with link to past and upcoming visits (maybe like sort them by when they are/make them different colors or add an emoji or smthn to signify upcoming or past)
    //Shows all pets that have visited the business and the reason for the visit as well as a button to take the user to a page with all the info given for the visit


    import React, {useContext} from 'react';
    import { NavLink } from 'react-router-dom';
    import UserContext from './UseContext';
    
    function Groomers() {
        const context = useContext(UserContext);
    
        return <h2>Groomers Dashboard</h2>;
    }
    
    export default Groomers;