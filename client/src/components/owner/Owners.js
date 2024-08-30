
    import React, { useContext, useEffect, useState } from 'react';
    import { NavLink } from 'react-router-dom';
    import { UserContext } from '../App.js';
    import PetCard from './PetCard';
    
    function Owners() {
        const context = useContext(UserContext);

        const [pets, setPets] = useState([]);
        const [jobs, setJobs] = useState([]);
        const [groomers, setGroomers] = useState([]);
    
        const user = context.currentUser;
    
        useEffect(() => {
            fetch('/pets')
                .then((res) => res.json())
                .then((res) => setPets(res));
        }, []);
    
        useEffect(() => {
            fetch('/worker_pets')
                .then(res => res.json())
                .then(res => setJobs(res));
        }, []);

        useEffect(() => {
            fetch('/groomers')
                .then(res => res.json())
                .then(res => setGroomers(res))
        }, []);
    
        const deletePet = (petId) => {
            fetch(`/pets/${petId}`, {
                method: 'DELETE',
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to delete pet');
                }
                setPets(prevPets => prevPets.filter(pet => pet.id !== petId));
            })
            .catch(error => {
                console.error('Error deleting pet:', error);
            });
        };
    
        const deleteJob = (jobId) => {
            fetch(`/worker_pets/${jobId}`, {
                method: 'DELETE',
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to delete job');
                }
                setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
            })
            .catch(error => {
                console.error('Error deleting job:', error);
            });
        };
    
        const DogCards = () => {
            if (!pets.length) {
                return <h2>Loading pets...</h2>;
            } else {
                return (
                    <div className="dog-cards-container">
                        {pets.map((pet) => {
                            if (pet && pet.owner === user.username) {
                                return (
                                    <div key={pet.id} className="pet-card-container">
                                        <PetCard pet={pet} onDelete={deletePet} onEdit={updatePet}/>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                );
            }
        };
    
        const CreateListing = () => {
            // Initialize state variables
            const [notes, setNotes] = useState('');
            const [jobType, setJobType] = useState('');
            const [selectedPet, setSelectedPet] = useState('');
            const [time, setTime] = useState('');
        
            const handleAddListing = (e) => {
                e.preventDefault();
        
                const requestData = {
                    arrival_time: parseInt(time),
                    owner_id: user.id,
                    worker_id: 1, // Replace with actual worker ID if needed
                    pet_id: selectedPet,
                    job_type: jobType,
                };

                console.log('running')
        
                fetch('/worker_pets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(res => {
                    // Update jobs state and clear form fields
                    setJobs(prevJobs => [...prevJobs, res]);
        
                    // Clear the form fields
                    setJobType('');
                    setSelectedPet('');
                    setNotes('');
                    setTime('');
                })
                .catch(error => {
                    console.error('Error adding job:', error);
                });
            };
        
            return (
                <div className="create-listing-container">
                    <h3>Create a New Job Listing</h3>
                    <form onSubmit={handleAddListing}>
                        <label>
                            Job Type:
                            <select 
                                value={jobType}
                                onChange={(e) => setJobType(e.target.value)}
                                className="form-select"
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
                                className="form-select"
                            >
                                <option value="">Select...</option>
                                {context.currentUser.pets.map((pet) => (
                                    <option value={pet.id} key={pet.id}>{pet.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Additional Notes:
                            <input 
                                type='text'
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="form-input"
                            />
                        </label>
                        <label>
                            Select Date:
                            <input
                                id='hire_date'
                                type="datetime-local"
                                placeholder="Hire Date"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="form-input"
                            />
                        </label>
                        <button type="submit" className="form-submit-button">Submit</button>
                    </form>
                </div>
            );
        }
        
        const CreatePet = () => {
            const [petName, setPetName] = useState('');
            const [breed, setBreed] = useState('');
            const [age, setAge] = useState('');
    
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
                    console.log('Pet added:', res);
                    setPets(prevPets => [...prevPets, res]);
                    setPetName('');
                    setBreed('');
                    setAge('');
                })
                .catch(error => {
                    console.error('Error adding pet:', error);
                });
            };
    
            return (
                <div className="create-pet-container">
                    <h3>Add a New Pet</h3>
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
                            <input 
                                type='text'
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                                className="form-input"
                            />
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
                        <button type="submit" className="form-submit-button">Submit</button>
                    </form>
                </div>
            );
        }

        const updatePet = (updatedPet) => {
            setPets(prevPets => prevPets.map(pet => pet.id === updatedPet.id ? updatedPet : pet));
        };



        function BookGroomingAppt() {
            const [selectedGroomer, setSelectedGroomer] = useState('');
            const [selectedPet, setSelectedPet] = useState('');
            const [appointmentTime, setAppointmentTime] = useState('');
        
            const handleBookAppointment = (e) => {
                e.preventDefault();
        
                const requestData = {
                    groomer_id: parseInt(selectedGroomer),
                    pet_id: parseInt(selectedPet),
                    appointment_time: appointmentTime  // Ensure this is in the format the backend expects
                };
        
                console.log("Sending appointment request:", requestData); // Debugging log
        
                fetch('/appointments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to book appointment');
                    }
                    return res.json();
                })
                .then(res => {
                    console.log("Appointment booked successfully:", res);
                    setSelectedGroomer('');
                    setSelectedPet('');
                    setAppointmentTime('');
                })
                .catch(error => {
                    console.error('Error booking appointment:', error);
                });
            };
        
            return (
                <div className="book-grooming-container">
                    <h3>Book Grooming Appointment</h3>
                    <form onSubmit={handleBookAppointment}>
                        <label>
                            Select Grooming Service:
                            <select 
                                value={selectedGroomer}
                                onChange={(e) => setSelectedGroomer(e.target.value)}
                                className="form-select"
                            >
                                <option value="">Select...</option>
                                {groomers.map((groomer) => (
                                    <option key={groomer.id} value={groomer.id}>{groomer.username}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Select Pet:
                            <select
                                value={selectedPet}
                                onChange={(e) => setSelectedPet(e.target.value)}
                                className="form-select"
                            >
                                <option value="">Select...</option>
                                {user.pets.map((pet) => (
                                    <option value={pet.id} key={pet.id}>{pet.name}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Appointment Time:
                            <input
                                type="datetime-local"
                                value={appointmentTime}
                                onChange={(e) => setAppointmentTime(e.target.value)}
                                className="form-input"
                            />
                        </label>
                        <button type="submit" className="form-submit-button">Book Appointment</button>
                    </form>
                </div>
            );
        }
        


    
        const Navbar = () => {
            return (
                <nav className='navbar'>
                    <NavLink to='/groomers'>Groomers</NavLink>
                    <NavLink to='/workerpets'>Job Listings</NavLink>
                    <NavLink to='/login'>Logout</NavLink>
                </nav>
            )
        }
    
        const MyJobs = () => {
            if (!jobs.length) {
                return <h2>Loading jobs...</h2>;
            }
    
            const userPetIds = new Set(context.currentUser.pets.map(pet => pet.id));
    
            const filteredJobs = jobs.filter(job => userPetIds.has(job.pet_id));
    
            return (
                <div>
                    {filteredJobs.length === 0 ? (
                        <p>No jobs found for your pets.</p>
                    ) : (
                        <ul>
                            {filteredJobs.map(job => (
                                <li key={job.id} className='card'>
                                    <strong>Job Type:</strong> {job.job_type}<br />
                                    <strong>Pet:</strong> {job.pet}<br />
                                    <strong>Arrival Time:</strong> {job.arrival_time}<br />
                                    <strong>Worker:</strong> {job.worker ? job.worker : 'none'}
                                    <button onClick={() => deleteJob(job.id)} className="delete-button">Delete</button>
                                    {/* Add other relevant job details */}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            );
        };
    
        return (
            <div className="main-container">
                <Navbar />
                <h2>Owners Dashboard</h2>
                <div className="forms-container">
                    <CreateListing />
                    <CreatePet />
                    <BookGroomingAppt />
                </div>
                <DogCards />
                <MyJobs />
            </div>
        );
    }
    
    export default Owners;
    

    
    
    //add cards for pets owned by the current owner logged in
    //add more info cards for pets to use dog API
    //add the listings created by them to their page with a way to show if they've been picked up
    //allow job listings to be editable
    //button on more info to book grooming visit and takes them to the grooming page with the selected dog aleady saved (use useContext for that)