import React, { useContext, useState } from 'react';
import PetMoreInfo from './PetMoreInfo';
import { BreedContext } from '../App.js';

function PetCard({ pet, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isMoreInfo, setIsMoreInfo] = useState(false);
    const [newName, setNewName] = useState(pet.name);
    const [newAge, setNewAge] = useState(pet.age);

    const context = useContext(BreedContext);
    const dogBreeds = context.dogBreeds

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {

        const requestData = {
            name: newName,
            age: parseInt(newAge),
        }

        fetch(`/pets/${pet.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
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
        setNewAge(pet.age);
    };

    const handleMoreInfoClick = (e) => {
        setIsMoreInfo(!isMoreInfo);
    };

    const handleDeletePet = () => {onDelete(pet.id)}

    return (
        <div key={pet.id} className='card'>
            {isEditing ? (
                <div className='card'>
                    Update Name:
                    <input 
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="form-input"
                    />
                    Update Age:
                    <input 
                        type='integer'
                        value={newAge}
                        onChange={(e) => setNewAge(e.target.value)}
                        className='form-input'
                    />
                    <button onClick={handleSaveClick} className="form-submit-button">Save</button>
                    <button onClick={handleCancelClick} className="cancel-button">Cancel</button>
                </div>
            ) : isMoreInfo ? (
                <>
                    <PetMoreInfo pet={pet}/>
                        <button onClick={handleMoreInfoClick} className="info-button">Less Info</button>
                </>
            ) : (
                <>
                    <h1>Name: {pet.name}</h1>
                    <h3>Breed: {pet.breed}</h3>
                    <h3>Age: {pet.age}</h3>
                    <button onClick={handleMoreInfoClick} className="info-button">More Info</button>
                    <button onClick={handleEditClick} className="claim-button">Edit Pet Info</button>
                    <button onClick={handleDeletePet} className='delete-button'>Delete Pet</button>
                </>
            )}
        </div>
    );
}



export default PetCard