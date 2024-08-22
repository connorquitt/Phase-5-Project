import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Login from './Login';
import Routes from './Routes';

const UserContext = createContext();

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(currentUser);

    const Navbar = () => {
        return (
            <nav className='navbar'>
                <NavLink to='/groomers'>Groomers</NavLink>
                <NavLink to='/workerpets'>Job Listings</NavLink>
                <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
            </nav>
        )
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
        <UserContext.Provider value={{ currentUser }}>
            <Router>
                <div className="App">
                    {isLoggedIn && <Navbar handleLogout={handleLogout} />}
                    <Routes isLoggedIn={isLoggedIn} handleLogin={handleLogin} setCurrentUser={setCurrentUser} />
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
export { UserContext };

