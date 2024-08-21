// Owners.js
//on dog cards have buttons that take you to the page to create job listings for walks and stuff
//when you post a job give the job card a visual way of seeing if its been claimed, also give job cards a way to claim them from perspective of a worker or way
//deny anyone who isn't certified with the boolean the worker model has
    //top of the owner screen have a post a job listing, after posting a small bar will show up underneath the user submittable stuff that shows very minimal
    //details as well as an emoji or letting the whole bar change color when it gets picked up/fufilled


    import React, { useContext, useState } from 'react';
    import { NavLink } from 'react-router-dom';
    import UserContext from './UseContext';
    
    function Owners() {
        const context = useContext(UserContext);
    
        const [notes, setNotes] = useState();
        const [jobType, setJobType] = useState();
        const [selectedPet, setSelectedPet] = useState();
        const [time, setTime] = useState();
    
        const Navbar = () => {
            return (
                <nav className='navbar'>
                    <NavLink to='/groomers'>Groomers</NavLink>
                    <NavLink to='/workerpets'>Job Listings</NavLink>
                    <NavLink to='/'>Logout</NavLink>
                </nav>
            )
        }
    
        const CreateListing = () => {
    
            return (
                <div>
                    <label>
                        Job Type:
                        <select 
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="pet_walker">Walker</option>
                            <option value="pet_sitter">Sitter</option>
                        </select>
                    </label>
                    <label>
                        Select Pet:
                        <select
                            value={selectedPet}
                            onChange={(e) => setSelectedPet(e.target.value)}
                        >
                            <option value="">Select...</option>
                            {context.currentUser.pets.map((pet) => {
                            return (
                                <option value={pet.id} key={pet.id}>{pet.name}</option>
                            )
                        })}
                        </select>
                    </label>
                    Additional Notes:
                    <input 
                        type='text'
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    Select Date:
                    <input
                        id='hire_date'
                        type="datetime-local"
                        placeholder="Hire Date"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <button type="submit">submit</button>
                </div>
            )
        }
    
        const Dogs = () => {
            const [pets, setPets] = useState()
    
            fetch('/pets')
            .then(res => res.json())
            .then(res => setPets(res))
            .then(console.log(pets))
    
        }
    
        const handleSubmit = (e) => {
            e.preventDefault()
    
            fetch('/worker_pets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    arrival_time: parseInt(time),
                    worker_id: 1,
                    pet_id: selectedPet
    
                }),
            })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(error => {
                console.error('Error adding meeting:', error);
            });
        }
    
    
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Navbar />
                    <h2>Owners Dashboard</h2>
                    <CreateListing />
                    <h1>{context.currentUser.username}</h1>
                    <Dogs />
                </form>
            </div>
        )
    }
    
    export default Owners;
    
    
    //add cards for pets owned by the current owner logged in
    //add more info cards for pets to use dog API
    //add the listings created by them to their page with a way to show if they've been picked up
    //allow job listings to be editable
    //button on more info to book grooming visit and takes them to the grooming page with the selected dog aleady saved (use useContext for that)