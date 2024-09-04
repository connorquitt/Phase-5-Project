import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

function Signup({ setCurrentUser }) {
    const history = useHistory();
    const [userType, setUserType] = useState('owner');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [petWalker, setPetWalker] = useState(false);
    const [petSitter, setPetSitter] = useState(false);
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [hours, setHours] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validationSchema = Yup.object().shape({
        userType: Yup.string().required('Please select a user type.'),
        username: Yup.string().required('Username is required.'),
        password: Yup.string().required('Password is required.'),
        businessName: Yup.string().nullable().when('userType', {
            is: 'groomer',
            then: Yup.string().required('Business name is required for groomers.'),
            otherwise: Yup.string().nullable(),
        }),
        address: Yup.string().nullable().when('userType', {
            is: 'groomer',
            then: Yup.string().required('Address is required for groomers.'),
            otherwise: Yup.string().nullable(),
        }),
        hours: Yup.string().nullable().when('userType', {
            is: 'groomer',
            then: Yup.string().required('Hours are required for groomers.'),
            otherwise: Yup.string().nullable(),
        }),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await validationSchema.validate({
                userType,
                username,
                password,
                businessName,
                address,
                hours,
            }, { abortEarly: false });

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
                ...(userType === 'groomer' && { business_name: businessName, address, hours })
            };

            const response = await fetch(createEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error(`Failed to create user: ${response.statusText}`);
            }

            const user = await response.json();
            setCurrentUser({ ...user, role: userType });
            history.push(`/${userType}s`);
            console.log('Signed up as:', user);
        } catch (error) {
            console.error(error);
            setErrors({ general: 'Failed to create user.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                    <strong>Select User Type: </strong>
                    <div>
                        <button
                            type="button"
                            onClick={() => setUserType('owner')}
                            className='claim-button'
                        >
                            Owner
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserType('worker')}
                            className='claim-button'
                        >
                            Worker
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserType('groomer')}
                            className='claim-button'
                        >
                            Groomer
                        </button>
                    </div>
                {errors.userType && <div style={{ color: 'red' }}>{errors.userType}</div>}
                <br /><br />

                <label>
                    <strong>Username: </strong>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
                <br /><br />

                <label>
                    <strong>Password: </strong>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                <br /><br />

                {userType === 'worker' && (
                    <>
                        <label>
                            <strong>Pet Walker: </strong>
                            <input
                                type="checkbox"
                                checked={petWalker}
                                onChange={() => setPetWalker(!petWalker)}
                            />
                        </label>
                        <br />
                        <label>
                            <strong>Pet Sitter: </strong>
                            <input
                                type="checkbox"
                                checked={petSitter}
                                onChange={() => setPetSitter(!petSitter)}
                            />
                        </label>
                        <br /><br />
                    </>
                )}

                {userType === 'groomer' && (
                    <>
                        <label>
                            <strong>Business Name: </strong>
                            <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                required
                            />
                        </label>
                        {errors.businessName && <div style={{ color: 'red' }}>{errors.businessName}</div>}
                        <br /><br />

                        <label>
                            <strong>Address: </strong>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </label>
                        {errors.address && <div style={{ color: 'red' }}>{errors.address}</div>}
                        <br /><br />

                        <label>
                            <strong>Hours: </strong>
                            <input
                                type="text"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                required
                            />
                        </label>
                        {errors.hours && <div style={{ color: 'red' }}>{errors.hours}</div>}
                        <br /><br />
                    </>
                )}

                <div>
                    <button type="submit" className='form-submit-button' disabled={isSubmitting}>
                        Sign Up
                    </button>
                    <button type="button" onClick={() => history.push('/login')} className='form-submit-button'>
                        Return to Login
                    </button>
                </div>

                {errors.general && <div style={{ color: 'red' }}>{errors.general}</div>}
            </form>
        </div>
    );
}

export default Signup;
