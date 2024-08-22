import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function PetCard({ pet }) {
    return (
        <div key={pet.id} className='card'>
            <h1>Name: {pet.name}</h1>
            <h3>Breed: {pet.breed}</h3>
            <h3>Age: {pet.age}</h3>
            <NavLink to={`/pet/${pet.id}`}>
                <button id={pet.id}>More Info</button>
            </NavLink>
            <NavLink to={`/groomers/${pet.id}`}>
                <button id={pet.id}>Book Grooming</button>
            </NavLink>
        </div>
    )
}

export default PetCard