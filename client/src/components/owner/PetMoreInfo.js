import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { MakePetCard } from './PetCard';

function PetMoreInfo() {
    const [breeds, setBreeds] = useState();
    const petBreed = useParams();


    const context = useContext(UserContext)

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

    const petBreedId = dogBreeds[petBreed.id]

    useEffect(() => {
        fetch(`https://dogapi.dog/api/v2/breeds/${petBreedId}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                const breedsArray = res.data || []; 
                setBreeds(breedsArray);
            });
    }, []);

    console.log(dogBreeds['Hokkaido'])
    console.log(context.currentUser)
    console.log(breeds)

    if (!breeds) {
        return <h1>...loading</h1>
    }
    return (
        <div>
            <MakePetCard breed={breeds} key={breeds.id} />
        </div>
    )

}

export default PetMoreInfo;

