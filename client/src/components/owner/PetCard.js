import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function PetCard({ pet }) {
    return (
        <div key={pet.id} className='card'>
            <h1>Name: {pet.name}</h1>
            <h3>Breed: {pet.breed}</h3>
            <h3>Age: {pet.age}</h3>
            <NavLink to={`/pet/${pet.breed}`}>
                <button id={pet.id}>More Info</button>
            </NavLink>
            <NavLink to={`/groomers/${pet.id}`}>
                <button id={pet.id}>Book Grooming</button>
            </NavLink>
        </div>
    )
}

function MakePetCard({ breed }) {
    const { name, attributes } = breed;

    return (
        <div className="card">
            <h3 className="card-title">{name}</h3>
            <div className="card-body">
                <h3><strong>Breed:</strong> {attributes.name}</h3>
                <p><strong>Hypoallergenic:</strong> {attributes.hypoallergenic ? 'Yes' : 'No'}</p>
                <p><strong>Life Span:</strong> {attributes.life.min} - {attributes.life.max} years</p>
                <p><strong>Female Weight:</strong> {attributes.female_weight.min} - {attributes.female_weight.max} kg</p>
                <p><strong>Male Weight:</strong> {attributes.male_weight.min} - {attributes.male_weight.max} kg</p>
            </div>
        </div>
    );
}

export default PetCard
export {MakePetCard}