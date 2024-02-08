import React, { useEffect, useState } from 'react';

function SalespeopleForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data= {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const salesrepUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(salesrepUrl, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json();

            setFirstName('');
            setLastName('');
            setEmployeeId('');
        }
    }

    return(
        <div className="h-screen">
            <div className="flex flex-col items-center">
                <br></br>
                <h1 className="text-4xl font-bold text-white">Create Sales Rep</h1>
                <br></br>
                <form onSubmit={handleSubmit} className="flex flex-col flex-center bg-gray-800 rounded shadow-lg p-8" action="">
                    <input value={firstName} onChange={handleFirstNameChange} placeholder="First Name" required type="text" name="firstName" id="firstName" className="flex items-center mb-2 h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2"/>
                    <input value={lastName} onChange={handleLastNameChange} placeholder="Last Name" required type="text" name="lastName" id="lastName" className="flex items-center mb-2 h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2"/>
                    <input value={employeeId} onChange={handleEmployeeIdChange} placeholder="Employee Id" required type="text" name="employeeId" id="employeeId" className="flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2"/>
                    <button className="flex items-center justify-center h-12 px-6 w-64 bg-cyan-700 mt-8 rounded font-semibold text-m text-blue-100 hover:bg-cyan-800">Create</button>
                </form>
            </div>
        </div>
    )
}

export default SalespeopleForm;
