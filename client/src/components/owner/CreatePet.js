import React, { useState, useContext } from 'react';
import { UserContext } from '../App';

function CreatePet({ setPets }) {
    const [petName, setPetName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [isOther, setIsOther] = useState(false);

    const context = useContext(UserContext);
    const user = context.currentUser;

    const handleBreedChange = (e) => {
        const selectedBreed = e.target.value;
        if (selectedBreed === 'other') {
            setBreed(''); // Clear the breed to allow input
            setIsOther(true);
        } else {
            setBreed(selectedBreed);
            setIsOther(false);
        }
    };

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
            setIsOther(false); // Reset the 'Other' state
        })
        .catch(error => {
            console.error('Error adding pet:', error);
        });
    };

    const handleReset = () => {
        setBreed('select');
        setIsOther(false);
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
                    {isOther ? (
                        <>
                            <button 
                                type="button" 
                                onClick={handleReset} 
                                className="reset-button"
                            >Reset</button>
                            <input
                                type='text'
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                                className="form-input"
                                placeholder="Enter dog breed"
                            />
                        </>
                    ) : (
                        <select
                            value={breed}
                            onChange={handleBreedChange}
                            className="form-select"
                        >
                            <option value="select">Select a breed...</option>
                            <option value="Caucasian Shepherd Dog">Caucasian Shepherd Dog</option>
                            <option value="Bouvier des Flandres">Bouvier des Flandres</option>
                            <option value="Grand Basset Griffon Vendéen">Grand Basset Griffon Vendéen</option>
                            <option value="Hokkaido">Hokkaido</option>
                            <option value="Japanese Terrier">Japanese Terrier</option>
                            <option value="Hanoverian Scenthound">Hanoverian Scenthound</option>
                            <option value="Tibetan Spaniel">Tibetan Spaniel</option>
                            <option value="Border Collie">Border Collie</option>
                            <option value="Curly-Coated Retriever">Curly-Coated Retriever</option>
                            <option value="Skye Terrier">Skye Terrier</option>
                            <option value="other">Other</option>
                        </select>
                    )}
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
