import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login({ setCurrentUser }) {
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        userType: Yup.string().required('Please select a user type.'),
        username: Yup.string().required('Username is required.'),
        password: Yup.string().required('Password is required.'),
    });

    const handleLogin = (values, { setSubmitting, setErrors }) => {
        const { userType, username, password } = values;

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
                    if (userType === 'groomer') {
                        history.push(`/groomers/${user.id}`);
                    } else {
                        history.push(`/${userType}s`);
                    }
                    console.log('Logged in as:', user);
                } else {
                    setErrors({ general: 'Invalid username or password.' });
                }
                setSubmitting(false);
            })
            .catch((error) => {
                console.error(error);
                setErrors({ general: 'Failed to fetch users.' });
                setSubmitting(false);
            });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <Formik
                initialValues={{ userType: '', username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ isSubmitting, errors }) => (
                    <Form>
                        <label>
                            <strong>Select User Type: </strong>
                            <Field as="select" name="userType">
                                <option value="">Select...</option>
                                <option value="owner">Owner</option>
                                <option value="worker">Worker</option>
                                <option value="groomer">Groomer</option>
                            </Field>
                            <br/>
                            <ErrorMessage name="userType" component="div" style={{ color: 'red' }} />
                            <br/>
                            
                        </label>
                        <br/><br/>

                        <label>
                            <strong>Username: </strong>
                            <Field type="text" name="username" />
                            <br/>
                            <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
                            <br/>

                        </label>
                        <br/><br/>

                        <label>
                            <strong>Password: </strong>
                            <Field type="password" name="password" />
                            <br/>
                            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                            <br/>

                        </label>
                        <br/><br/>

                        <button 
                            type="submit" 
                            className="form-submit-button" 
                            style={{ width: '85px' }} 
                            disabled={isSubmitting}
                        >
                            Login
                        </button>

                        <button 
                            type="button" 
                            onClick={() => history.push('/signup')} 
                            className="form-submit-button" 
                            style={{ width: '85px' }}
                        >
                            Signup
                        </button>
                        <br/><br/>

                        {errors.general && <div style={{ color: 'red' }}>{errors.general}</div>}
                        <br/>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
