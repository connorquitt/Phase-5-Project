import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DateTime } from 'luxon';
import { UserContext } from '../App';

function BookGroomingAppt({ groomers, setAppointments }) {
    const context = useContext(UserContext);
    const user = context.currentUser;

    const validationSchema = Yup.object({
        groomer: Yup.string().required('Groomer is required'),
        selectedPet: Yup.string().required('Pet is required'),
        service: Yup.string().required('Service is required'),
        time: Yup.string().required('Date and time are required'),
    });

    const handleAddAppointment = (values, { resetForm }) => {
        const formattedTime = DateTime.fromISO(values.time).toLocaleString(DateTime.DATETIME_SHORT);

        const requestData = {
            appointment_time: formattedTime,
            groomer_id: parseInt(values.groomer),
            pet_id: parseInt(values.selectedPet),
            owner_id: user.id,
            service: values.service,
            isCompleted: false,
        };

        console.log('book appt request data', requestData);

        fetch('/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(res => res.json())
        .then(res => {
            console.log('response', res);
            setAppointments(prevAppts => [...prevAppts, res]);
            resetForm();
        })
        .catch(error => {
            console.error('Error adding grooming appointment:', error);
        });
    };

    return (
        <div className="book-grooming-container">
            <h3>Book a Grooming Appointment</h3>
            <Formik
                initialValues={{
                    groomer: '',
                    selectedPet: '',
                    service: '',
                    time: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleAddAppointment}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label>
                            Select Groomer:
                            <Field as="select" name="groomer" className="form-select">
                                <option value="">Select...</option>
                                {groomers.map(groomer => (
                                    <option value={groomer.id} key={groomer.id}>{groomer.username}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="groomer" component="div" className="error-message" style={{color: 'red'}} />
                            <br/>
                        </label>
                        <label>
                            Select Pet:
                            <Field as="select" name="selectedPet" className="form-select">
                                <option value="">Select...</option>
                                {user.pets.map(pet => (
                                    <option value={pet.id} key={pet.id}>{pet.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="selectedPet" component="div" className="error-message" style={{color: 'red'}} />
                            <br/>

                        </label>
                        <label>
                            Select Service:
                            <Field as="select" name="service" className="form-select">
                                <option value="">Select...</option>
                                <option value="Bath">Bath Dry</option>
                                <option value="Haircut">Haircut and Styling</option>
                                <option value="Nails">Nail Trimming</option>
                                <option value="Deshedding">Deshedding Treatment</option>
                                <option value="Flea and Tick">Flea and Tick Prevention</option>
                            </Field>
                            <ErrorMessage name="service" component="div" className="error-message" style={{color: 'red'}} />
                            <br/>

                        </label>
                        <label>
                            Select Date:
                            <Field type="datetime-local" name="time" className="form-input" />
                            <ErrorMessage name="time" component="div" className="error-message" style={{color: 'red'}}/>
                            <br/>
                        </label>
                        <button type="submit" className="form-submit-button" disabled={isSubmitting}>
                            Book Appointment
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default BookGroomingAppt;

