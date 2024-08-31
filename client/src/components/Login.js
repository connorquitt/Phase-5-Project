import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ setCurrentUser }) {
    const [userType, setUserType] = useState('owner');
    const [username, setUsername] = useState('johndoe');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');

    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!userType) {
            setError('Please select a user type.');
            return;
        }

        const queryEndpoint = 
            userType === 'owner' 
            ? '/owners' 
            : userType === 'worker' 
            ? '/workers' 
            : '/groomers';

        fetch(queryEndpoint)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch users: ${response.statusText}`);
                }
                return response.json();
            })
            .then((users) => {
                const user = users.find((u) => u.username === username && u.password === password);
                if (user) {
                    setCurrentUser({ ...user, role: userType });
                    setError('');
                    history.push(`/${userType}s`);
                    console.log('Logged in as:', user);
                } else {
                    setError('Invalid username or password.');
                }
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to fetch users.');
            });
    };

    const redirectToSignup = () => {
        history.push('/signup');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Select User Type:
                    <select 
                        value={userType} 
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="">Select...</option>
                        <option value="owner">Owner</option>
                        <option value="worker">Worker</option>
                        <option value="groomer">Groomer</option>
                    </select>
                </label>

                <label>
                    Username:
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </label>

                <label>
                    Password:
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </label>

                <button type="submit">Login</button>

                <button type="button" onClick={redirectToSignup}>Signup</button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
