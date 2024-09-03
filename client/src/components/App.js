import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Login from './Login';
import Routes from './Routes';

const UserContext = createContext();
const BreedContext = createContext();

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(currentUser);

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

    const Navbar = () => {
        if (currentUser.role === 'owner') {
            return (
                <nav className='navbar'>
                    <NavLink to='/owners'>HomePage</NavLink>
                    <NavLink to='/appointments'>Past Appointments</NavLink>
                    <NavLink to='/jobs'>Past Jobs</NavLink>
                    <NavLink to='/groomers'>Groomers Near Me</NavLink>
                    <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
                </nav>
            )
        } if (currentUser.role === 'worker') {
            return (
                <nav className='navbar'>
                    <NavLink to='/workers'>HomePage</NavLink>
                    <NavLink to='/jobs'>Past Jobs</NavLink>
                    <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
                </nav>
            )
        } else {
            return (
                <nav className='navbar'>
                    <NavLink to={`/groomers/${currentUser.id}`}>HomePage</NavLink>
                    <NavLink to='/appointments'>Past Appointments</NavLink>
                    <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
                </nav>
            )
        }
    }

    const handleLogin = (user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
    };

    return (
        <BreedContext.Provider value={{ dogBreeds }}>
        <UserContext.Provider value={{ currentUser }}>
            <Router>
                <div className="App">
                    {isLoggedIn && <Navbar handleLogout={handleLogout} />}
                    <Routes isLoggedIn={isLoggedIn} handleLogin={handleLogin} setCurrentUser={setCurrentUser} />
                </div>
            </Router>
        </UserContext.Provider>
        </BreedContext.Provider>
    );
}

export default App;
export { UserContext, BreedContext };

