import React, { useContext } from 'react';
import PetCard from './PetCard';
import { UserContext } from '../App';

function DogCards({ pets, deletePet, updatePet }) {

    const context = useContext(UserContext);
    const user = context.currentUser;

    if (!pets.length) {
        return <h2>Loading pets...</h2>;
    } else {
        return (
            <>
            <h1>My Pets:</h1>
            <div className="dog-cards-container">
                {pets.map((pet) => {
                    if (pet && pet.owner === user.username) {
                        return (
                            <div key={pet.id} className="pet-card-container">
                                <PetCard pet={pet} onDelete={deletePet} onEdit={updatePet} />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            </>
        );
    }
}

export default DogCards;
