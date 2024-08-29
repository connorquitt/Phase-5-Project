import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PetMoreInfo, { MakePetCard } from './PetMoreInfo';

function PetCard({ pet, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isMoreInfo, setIsMoreInfo] = useState(false); // New state to toggle more info
    const [newName, setNewName] = useState(pet.name);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        fetch(`/pets/${pet.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName }),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to update pet info');
            }
            return res.json();
        })
        .then(updatedPet => {
            onEdit(updatedPet);
            setIsEditing(false);
        })
        .catch(error => {
            console.error('Error updating pet:', error);
        });
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setNewName(pet.name);
    };

    const handleMoreInfoClick = (e) => {
        setIsMoreInfo(!isMoreInfo); // Toggle the more info view
        //return <MakePetCard PetBreed={pet.breed}/>
    };

    return (
        <div key={pet.id} className='card'>
            {isEditing ? (
                <>
                    <input 
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="form-input"
                    />
                    <button onClick={handleSaveClick} className="form-submit-button">Save</button>
                    <button onClick={handleCancelClick} className="form-cancel-button">Cancel</button>
                </>
            ) : isMoreInfo ? ( // Conditional rendering for more info view
                <>
                    <PetMoreInfo pet={pet}/>
                    <NavLink to={'/owners'}>
                        <button onClick={handleMoreInfoClick} className="edit-button">Less Info</button>
                    </NavLink>
                </>
            ) : (
                <>
                    <h1>Name: {pet.name}</h1>
                    <h3>Breed: {pet.breed}</h3>
                    <h3>Age: {pet.age}</h3>
                    <button onClick={handleEditClick} className="edit-button">Edit Pet Info</button>
                    <NavLink to={`/owners/${pet.id}`}>
                        <button onClick={handleMoreInfoClick} className="more-info-button">More Info</button>
                    </NavLink>
                </>
            )}
        </div>
    );
}



export default PetCard