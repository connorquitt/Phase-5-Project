import React, { useState, useEffect } from 'react';

function PetMoreInfo({ pet }) {
    const [breeds, setBreeds] = useState();

    const dogBreeds = {
        "Caucasian Shepherd Dog": "68f47c5a-5115-47cd-9849-e45d3c378f12",
        "Bouvier des Flandres": "4ddbe251-72af-495e-8e9d-869217e1d92a",
        "Grand Basset Griffon Vendéen": "f534c847-bed1-4b58-b194-dc06ecfe20f9",
        "Hokkaido": "30f62219-e225-42cd-bd07-02425f944c07",
        "Japanese Terrier": "087979f3-1c45-4d8a-a153-462bf5ea379e",
        "Hanoverian Scenthound": "dbff689b-8370-4b6a-9306-215aba549102",
        "Tibetan Spaniel": "6f540c30-27a8-48cc-8d88-0b1d9fa99167",
        "Border Collie": "20b1d8be-ae44-4a70-8526-0612904bc9b2",
        "Curly-Coated Retriever": "6dee41b1-0805-4f4e-a079-c8b1cdfa1768",
        "Skye Terrier": "beff84c3-66c4-4335-beba-f346c2565881"
    };

    const petBreedId = dogBreeds[pet.breed]

    useEffect(() => {
        fetch(`https://dogapi.dog/api/v2/breeds/${petBreedId}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const breedsArray = res.data || []; 
                setBreeds(breedsArray);
            });
    }, [pet.id]);

    if (!breeds) {
        return <h1>...loading</h1>
    }
    return (
        <div>
            <MakePetCard breed={breeds} key={breeds.id} pet={pet} />
        </div>
    )

}


function MakePetCard({ breed, pet }) {
    
    if (!breed || !breed.attributes) {
        // Show loading state or fallback UI
        return <h3>Loading...</h3>;
    }

    const { name, attributes } = breed;

    return (
        <div className="card">
            <h3 className="card-title">{name}</h3>
            <div className="card-body">
                <h1><strong>Name:</strong> {pet.name}</h1>
                <h3><strong>Breed:</strong> {attributes.name}</h3>
                <p><strong>Hypoallergenic:</strong> {attributes.hypoallergenic ? 'Yes' : 'No'}</p>
                <p><strong>Life Span:</strong> {attributes.life.min} - {attributes.life.max} years</p>
                <p><strong>Female Weight:</strong> {attributes.female_weight.min} - {attributes.female_weight.max} kg</p>
                <p><strong>Male Weight:</strong> {attributes.male_weight.min} - {attributes.male_weight.max} kg</p>
            </div>
        </div>
    );
}


export default PetMoreInfo;
export {MakePetCard}

