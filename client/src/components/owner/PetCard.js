import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PetMoreInfo from './PetMoreInfo';

function PetCard({ pet, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isMoreInfo, setIsMoreInfo] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: pet.name,
            age: pet.age,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Pet name is required'),
            age: Yup.number().required('Age is required').integer('Age must be an integer'),
        }),
        onSubmit: (values) => {
            const requestData = {
                name: values.name,
                age: parseInt(values.age),
            };

            fetch(`/pets/${pet.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to update pet info');
                }
                return res.json();
            })
            .then(updatedPet => {
                onEdit(updatedPet);
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error updating pet:', error);
            });
        },
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        formik.resetForm();
    };

    const handleMoreInfoClick = () => {
        setIsMoreInfo(!isMoreInfo);
    };

    const handleDeletePet = () => {
        onDelete(pet.id);
    };

    return (
        <div key={pet.id} className='card'>
            {isEditing ? (
                <form onSubmit={formik.handleSubmit} className='card'>
                    <label>
                        Update Name:
                        <input 
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-input"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div style={{ color: 'red' }}>{formik.errors.name}</div>
                        ) : null}
                        <br/>
                    </label>
                    <label>
                        Update Age:
                        <input 
                            type='number'
                            name="age"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='form-input'
                        />
                        {formik.touched.age && formik.errors.age ? (
                            <div style={{ color: 'red' }}>{formik.errors.age}</div>
                        ) : null}
                        <br/>
                    </label>
                    <button type="submit" className="form-submit-button">Save</button>
                    <button type="button" onClick={handleCancelClick} className="cancel-button">Cancel</button>
                </form>
            ) : isMoreInfo ? (
                <>
                    <PetMoreInfo pet={pet} />
                    <button onClick={handleMoreInfoClick} className="info-button">Less Info</button>
                </>
            ) : (
                <>
                    <h1>Name: {pet.name}</h1>
                    <h3>Breed: {pet.breed}</h3>
                    <h3>Age: {pet.age}</h3>
                    <button onClick={handleMoreInfoClick} className="info-button">More Info</button>
                    <button onClick={handleEditClick} className="claim-button">Edit Pet Info</button>
                    <button onClick={handleDeletePet} className='delete-button'>Delete Pet</button>
                </>
            )}
        </div>
    );
}

export default PetCard;
