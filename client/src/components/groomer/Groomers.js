// Groomers.js
//Brings the user to a page showing their business info and any bookings they have coming up.
//Navbar with link to past and upcoming visits (maybe like sort them by when they are/make them different colors or add an emoji or smthn to signify upcoming or past)
    //Shows all pets that have visited the business and the reason for the visit as well as a button to take the user to a page with all the info given for the visit

    import React, { useContext, useState, useEffect } from 'react';
    import { NavLink, useHistory } from 'react-router-dom';
    import { UserContext } from '../App.js';
    
    function Groomers() {
        const context = useContext(UserContext);
        const history = useHistory();
    
        const [groomers, setGroomers] = useState([]);
    
        useEffect(() => {
            fetch('/groomers')
                .then(res => res.json())
                .then(res => setGroomers(res));
        }, []);
    
        const deleteGroomer = (groomerId) => {
            fetch(`/groomers/${groomerId}`, {
                method: 'DELETE',
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to delete groomer');
                }
                setGroomers(prevGroomers => prevGroomers.filter(groomer => groomer.id !== groomerId));
            })
            .catch(error => {
                console.error('Error deleting groomer:', error);
            });
        };
    
        const handleMoreInfo = (groomerId) => {
            history.push(`/groomer/${groomerId}`); // Assuming dynamic route for each groomer
        };
    
        if (!groomers.length) {
            return <h1>...loading</h1>;
        }
    
        return (
            <div className='main-container'>
                <Navbar />
                <h2>Groomers Dashboard</h2>
                <div className='groomer-cards-container'>
                    {groomers.map((groomer) => (
                        <div key={groomer.id} className='card groomer-card'>
                            <h1 className='card-title'>{groomer.username}</h1>
                            <p className='card-body'>
                                <strong>Working Hours:</strong> {groomer.working_hours}
                            </p>
                            <button 
                                onClick={() => deleteGroomer(groomer.id)}
                                className='delete-button'
                            >
                                Delete
                            </button>
                            <button 
                                onClick={() => handleMoreInfo(groomer.id)}
                                className='more-info-button'
                            >
                                More Info
                            </button>
                            <PetMoreInfo />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function PetMoreInfo() {
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
        
    
        useEffect(() => {
            fetch('https://dogapi.dog/api/v2/breeds')
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    const breedsArray = res.data || []; 
                    setBreeds(breedsArray);
                });
        }, []);
    
        console.log(dogBreeds['Hokkaido'])
    
    }
    
    const Navbar = () => {
        return (
            <nav className='navbar'>
                <NavLink to='/groomer_visits'>Appointments</NavLink>
                <NavLink to='/login'>Logout</NavLink>
            </nav>
        );
    }
    
    export default Groomers;

//need to change groomer model to have a list with all upcomings appointments that can be added to
//need the cards to be appointments coming up with current user as the logged in groomer
    