import React, { useState, useEffect } from "react";

function GroomerList() {

    const [groomers, setGroomers] = useState([]);

    useEffect(() => {
        fetch('/groomers')
            .then(res => res.json())
            .then(res => setGroomers(res))
    }, [])

    console.log(groomers)

    return (
        <div className="dog-card-container">
            <h1>Groomers List:</h1>
            {groomers.map((groomer) => (
                <div className="card" key={groomer.id}> <br />
                    <strong>Name:</strong> {groomer.business_name} <br />
                    <strong>Hours:</strong> {groomer.hours} <br />
                    <strong>Address:</strong> {groomer.address} <br />
                </div>
            ))}
        </div>
    )
}

function GroomerCard(groomer) {
    
    return (
        <div className="card" key={groomer.id}>
            <h1><strong>Name:</strong>{groomer.business_name}</h1>
        </div>
    )
}

export default GroomerList;