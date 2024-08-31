// src/components/DogCards.js

import React from 'react';
import PetCard from './PetCard';

function DogCards({ pets, user, deletePet, updatePet }) {
    if (!pets.length) {
        return <h2>Loading pets...</h2>;
    } else {
        return (
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
        );
    }
}

export default DogCards;
