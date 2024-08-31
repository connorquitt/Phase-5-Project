// src/components/CreatePet.js

import React, { useState } from 'react';

function CreatePet({ user, setPets }) {
    const [petName, setPetName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');

    const handleAddPet = (e) => {
        e.preventDefault();

        const requestData = {
            name: petName,
            breed: breed,
            age: parseInt(age),
            owner_id: user.id,
        };

        fetch('/pets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(res => res.json())
        .then(res => {
            setPets(prevPets => [...prevPets, res]);
            setPetName('');
            setBreed('');
            setAge('');
        })
        .catch(error => {
            console.error('Error adding pet:', error);
        });
    };

    return (
        <div className="create-pet-container">
            <h3>Create a New Pet</h3>
            <form onSubmit={handleAddPet}>
                <label>
                    Pet Name:
                    <input
                        type='text'
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        className="form-input"
                    />
                </label>
                <label>
                    Breed:
                    <input
                        type='text'
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        className="form-input"
                    />
                </label>
                <label>
                    Age:
                    <input
                        type='number'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="form-input"
                    />
                </label>
                <button type="submit" className="form-submit-button">Add Pet</button>
            </form>
        </div>
    );
}

export default CreatePet;
