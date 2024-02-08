import { useState, useEffect } from 'react';

function AutomobileForm () {
    const [models, setModels] = useState([]);
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model, setModel] = useState();

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};

        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model_id = model;

        const automobilesUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(automobilesUrl, fetchConfig);
        if (response.ok) {
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className="h-screen">
            <div className="flex flex-col items-center">
            <br></br>
            <h1 className="flex flex-col flex-center bg-gray-800 rounded shadow-lg p-8">Add an Automobile</h1>
            <br></br>
                <form onSubmit={handleSubmit} className="flex flex-col flex-center bg-gray-800 rounded shadow-lg p-8" action="">
                    <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2"></input>

                    <input value={year} onChange={handleYearChange} placeholder="Year" required type="text" name="year" id="year" className="mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2"></input>

                    <input value={vin} onChange={handleVinChange} placeholder="Vin" required type="text" name="vin" id="vin" className="mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2"></input>

                    <select value={model} onChange={handleModelChange} required name="model" id="model" className="mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2">
                    <option value="">Choose a model</option>
                    {models.map(model => {
                        return (
                            <option key={model.id} value={model.id}>
                                {model.name}
                            </option>
                        );
                    })}
                    </select>

                <button className="flex items-center justify-center h-12 px-6 w-64 bg-cyan-700 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-cyan-800">Create</button>
                </form>
            </div>
        </div>

    )


}

export default AutomobileForm;
