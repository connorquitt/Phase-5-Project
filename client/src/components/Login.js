import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ setCurrentUser }) {
    const [userType, setUserType] = useState('groomers');
    const [username, setUsername] = useState('pawsclaws123');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');

    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
    
        if (!userType) {
            setError('Please select a user type.');
            return;
        }
    
        const queryEndpoint = 
            userType === 'owners' 
            ? '/owners' 
            : userType === 'workers' 
            ? '/workers' 
            : '/groomers';
    
        fetch(`/${userType}`)
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
                    if (userType === 'groomers') {
                        history.push(`/groomers/${user.id}`); // Navigate to /groomers/:id
                    } else {
                        history.push(`/${userType}s`); // Navigate to /owners or /workers
                    }
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
                        <option value="owners">Owner</option>
                        <option value="workers">Worker</option>
                        <option value="groomers">Groomer</option>
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
