import React, { useState, useEffect, useContext } from 'react';
import { BreedContext } from '../App';

function PetMoreInfo({ pet }) {
    const [breeds, setBreeds] = useState([]);

    const context = useContext(BreedContext);
    const dogBreeds = context.dogBreeds

    const petBreedId = dogBreeds[pet.breed]

    useEffect(() => {
        fetch(`https://dogapi.dog/api/v2/breeds/${petBreedId}`)
            .then(res => res.json())
            .then(res => {
                const breedsArray = res.data || []; 
                setBreeds(res.data || [])
                console.log('successful more info breeds array', breedsArray)
                console.log('successful more info breeds state', breeds)
            })
            .catch(error => {
                console.log('error getting breed', error)
                console.log('failed more info', breeds)
                setBreeds('none')
            })
    }, [pet.id]);

    console.log('breeds outside fetch:', breeds)

    if (!breeds) {
        return <h1>...loading</h1>
    }
    return (
        <div>
            <DogMoreInfo breed={breeds} key={breeds.id} pet={pet} />
        </div>
    )

}


function DogMoreInfo({ breed, pet }) {

    console.log('more info breed', breed)
    console.log('more info pet', pet)
    
    if (breed === 'none') {
        return (
            <div className='card'>
                <h1><strong>Name:</strong> {pet.name}</h1>
                <h3><strong>Breed:</strong> {pet.breed}</h3>
                <h3 style={{ color: 'red' }} >Breed Information not Available</h3>
            </div>
        )
    }if (!breed || !breed.attributes) {
        return <h3>Loading...</h3>;
    }else{
        const { name, attributes } = breed;

        return (
            <div className="card">
                <h3 className="card-title">{name}</h3>
                <div className="card-body">
                    <h1><strong>Name:</strong> {pet.name}</h1>
                    <h3><strong>Breed:</strong> {pet.breed}</h3>
                    <p><strong>Hypoallergenic:</strong> {attributes.hypoallergenic ? 'Yes' : 'No'}</p>
                    <p><strong>Life Span:</strong> {attributes.life.min} - {attributes.life.max} years</p>
                    <p><strong>Female Weight:</strong> {attributes.female_weight.min} - {attributes.female_weight.max} kg</p>
                    <p><strong>Male Weight:</strong> {attributes.male_weight.min} - {attributes.male_weight.max} kg</p>
                </div>
            </div>
        );
    }
}


export default PetMoreInfo;

