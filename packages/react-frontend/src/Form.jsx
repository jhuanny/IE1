import React, { useState } from "react";

function Form(props) {
    const [person, setPerson] = useState({ name: "", job: "" });

    function handleChange(event) {
        const { name, value } = event.target;
        setPerson(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();  
        if (person.name && person.job) {
            props.handleSubmit(person);
            setPerson({ name: "", job: "" });  
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={person.name}
                onChange={handleChange}
            />
            <label htmlFor="job">Job</label>
            <input
                type="text"
                name="job"
                id="job"
                value={person.job}
                onChange={handleChange}
            />
            <button type="submit">Add Character</button>
        </form>
    );
}

export default Form;
