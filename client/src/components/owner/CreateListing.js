import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DateTime } from 'luxon';
import { UserContext } from '../App';

function CreateListing({ setJobs }) {
    const context = useContext(UserContext);
    const user = context.currentUser;

    const validationSchema = Yup.object({
        jobType: Yup.string().required('Job Type is required'),
        selectedPet: Yup.string().required('Pet selection is required'),
        notes: Yup.string(),
        time: Yup.string().required('Date and time are required'),
    });

    const handleAddListing = (values, { resetForm }) => {
        const formattedTime = DateTime.fromISO(values.time).toLocaleString(DateTime.DATETIME_SHORT);

        const requestData = {
            arrival_time: formattedTime,
            isCompleted: false,
            owner_id: user.id,
            worker_id: 1,
            pet_id: parseInt(values.selectedPet),
            job_type: values.jobType,
            notes: values.notes || '',
        };

        console.log('create job request data', requestData);

        fetch('/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(res => res.json())
        .then(res => {
            setJobs(prevJobs => [...prevJobs, res]);
            resetForm();
        })
        .catch(error => {
            console.error('Error adding job:', error);
        });
    };

    return (
        <div className="create-listing-container">
            <h3>Create a New Job Listing</h3>
            <Formik
                initialValues={{
                    jobType: '',
                    selectedPet: '',
                    notes: '',
                    time: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleAddListing}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label>
                            Job Type:
                            <Field as="select" name="jobType" className="form-select">
                                <option value="">Select...</option>
                                <option value="pet_walker">Walker</option>
                                <option value="pet_sitter">Sitter</option>
                            </Field>
                            <ErrorMessage name="jobType" component="div" className="error-message" style={{ color: 'red' }} />
                            <br/>
                            
                        </label>
                        <label>
                            Select Pet:
                            <Field as="select" name="selectedPet" className="form-select">
                                <option value="">Select...</option>
                                {user.pets.map((pet) => (
                                    <option value={pet.id} key={pet.id}>{pet.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="selectedPet" component="div" className="error-message" style={{ color: 'red' }} />
                            <br/>

                        </label>
                        <label>
                            Additional Notes:
                            <Field
                                type='text'
                                name='notes'
                                className="form-input"
                            />
                        </label>
                        <label>
                            Select Date:
                            <Field
                                type="datetime-local"
                                name="time"
                                className="form-input"
                            />
                            <ErrorMessage name="time" component="div" className="error-message" style={{ color: 'red' }} />
                            <br/>

                        </label>
                        <button type="submit" className="form-submit-button" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateListing;
