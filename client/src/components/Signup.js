import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Signup({ setCurrentUser }) {
    const [userType, setUserType] = useState('owner');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [petWalker, setPetWalker] = useState(false);
    const [petSitter, setPetSitter] = useState(false);
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [hours, setHours] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    const handleSignup = (e) => {
        e.preventDefault();

        if (!userType) {
            setError('Please select a user type.');
            return;
        }

        const createEndpoint =
            userType === 'owner'
                ? '/owners'
                : userType === 'worker'
                ? '/workers'
                : '/groomers';

        const newUser = {
            username,
            password,
            ...(userType === 'worker' && { pet_walker: petWalker, pet_sitter: petSitter }),
            ...(userType === 'groomer' && { business_name: businessName ,address, hours })
        };

        fetch(createEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to create user: ${response.statusText}`);
                }
                return response.json();
            })
            .then((user) => {
                setCurrentUser({ ...user, role: userType });
                setError('');
                history.push(`/${userType}s`);
                console.log('Signed up as:', user);
            })
            .catch((error) => {
                console.error(error);
                setError('Failed to create user.');
            });
    };

    const redirectToLogin = () => {
        history.push('/login');
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
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

                {userType === 'worker' && (
                    <>
                        <label>
                            Pet Walker:
                            <input
                                type="checkbox"
                                checked={petWalker}
                                onChange={(e) => setPetWalker(e.target.checked)}
                            />
                        </label>
                        <label>
                            Pet Sitter:
                            <input
                                type="checkbox"
                                checked={petSitter}
                                onChange={(e) => setPetSitter(e.target.checked)}
                            />
                        </label>
                    </>
                )}

                {userType === 'groomer' && (
                    <>
                        <label>
                            Business Name:
                            <input
                                type='text'
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Address:
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Hours:
                            <input
                                type="text"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                required
                            />
                        </label>
                    </>
                )}

                <button type="submit">Sign Up</button>
                <button type="button" onClick={redirectToLogin}>Return to Login</button>

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Signup;