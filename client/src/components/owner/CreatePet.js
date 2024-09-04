import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../App';

function CreatePet({ setPets }) {
    const context = useContext(UserContext);
    const user = context.currentUser;

    const validationSchema = Yup.object({
        petName: Yup.string().required('Pet name is required'),
        breed: Yup.string().required('Breed is required'),
        age: Yup.number().required('Age is required').integer('Age must be an integer'),
    });

    const handleAddPet = (values, { resetForm }) => {
        const requestData = {
            name: values.petName,
            breed: values.breed,
            age: parseInt(values.age),
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
            setPets(prevPets => [...prevPets, res]);
            resetForm();
        })
        .catch(error => {
            console.error('Error adding pet:', error);
        });
    };

    return (
        <div className="create-pet-container">
            <h3>Create a New Pet</h3>
            <Formik
                initialValues={{
                    petName: '',
                    breed: '',
                    age: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleAddPet}
            >
                {({ values, isSubmitting, setFieldValue }) => (
                    <Form>
                        <label>
                            Pet Name:
                            <Field
                                type="text"
                                name="petName"
                                className="form-input"
                            />
                            <ErrorMessage name="petName" component="div" className="error-message" style={{ color: 'red' }} />
                            <br/>

                        </label>
                        <label>
                            Breed:
                            {values.breed === 'other' ? (
                                <>
                                    <button 
                                        type="button" 
                                        onClick={() => setFieldValue('breed', 'select')} 
                                        className="reset-button"
                                    >Reset</button>
                                    <Field
                                        type="text"
                                        name="breed"
                                        className="form-input"
                                        placeholder="Enter dog breed"
                                    />
                                </>
                            ) : (
                                <Field as="select"
                                    name="breed"
                                    className="form-select"
                                    onChange={(e) => {
                                        const selectedBreed = e.target.value;
                                        setFieldValue('breed', selectedBreed);
                                    }}
                                >
                                    <option value="">Select a breed...</option>
                                    <option value="Caucasian Shepherd Dog">Caucasian Shepherd Dog</option>
                                    <option value="Bouvier des Flandres">Bouvier des Flandres</option>
                                    <option value="Grand Basset Griffon Vendéen">Grand Basset Griffon Vendéen</option>
                                    <option value="Hokkaido">Hokkaido</option>
                                    <option value="Japanese Terrier">Japanese Terrier</option>
                                    <option value="Hanoverian Scenthound">Hanoverian Scenthound</option>
                                    <option value="Tibetan Spaniel">Tibetan Spaniel</option>
                                    <option value="Border Collie">Border Collie</option>
                                    <option value="Curly-Coated Retriever">Curly-Coated Retriever</option>
                                    <option value="Skye Terrier">Skye Terrier</option>
                                    <option value="other">Other</option>
                                </Field>
                            )}
                            <ErrorMessage name="breed" component="div" className="error-message" style={{ color: 'red' }} />
                            <br/>

                        </label>
                        <label>
                            Age:
                            <Field
                                type="number"
                                name="age"
                                className="form-input"
                            />
                            <ErrorMessage name="age" component="div" className="error-message" style={{ color: 'red' }} />
                            <br/>
                            
                        </label>
                        <button type="submit" className="form-submit-button" disabled={isSubmitting}>
                            Add Pet
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreatePet;
