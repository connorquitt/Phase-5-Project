import React, { useState } from "react";
import { UserContext } from "../App";
import PetMoreInfo from "../owner/PetMoreInfo";

function GroomerCard({ appointment, handleDelete }) {

    const [moreInfoPetId, setMoreInfoPetId] = useState(null);
    const [isMoreInfo, setIsMoreInfo] = useState(false);

    console.log(appointment)

    
    function handleMoreInfo() {
        setIsMoreInfo(!isMoreInfo);
        setMoreInfoPetId({"breed": "Caucasian Shepherd Dog"});
    }

    function handleLessInfo() {
        setIsMoreInfo(!isMoreInfo);
        setMoreInfoPetId(null);
    }

    return (
        <div className='card'>
        {isMoreInfo ? ( // Conditional rendering for more info view
            <>
                <PetMoreInfo pet={moreInfoPetId} />
                <button type='button' onClick={handleLessInfo}>Less Info</button>
            </>
        ) : (
        
            <>    
                <h1><strong>Pet Name:</strong> {appointment.pet}</h1>
                <p><strong>Appointment Time:</strong> {new Date(appointment.appointment_time).toLocaleString()}</p>
                <p><strong>Groomer:</strong> {appointment.groomer}</p>
                <button onClick={handleMoreInfo} className='claim-button'>More Info</button>
                <button className="cancel-button" onClick={() => handleDelete(appointment.id)}>Delete Appointment</button>
            </>
            
        )}
    </div>
    );
}

export default GroomerCard