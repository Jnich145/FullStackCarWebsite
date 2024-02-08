import { useState, useEffect } from 'react';

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/manufacturers/')

        if (response.ok) {
            const data = await response.json()
            setManufacturers(data.manufacturers)
            console.log(data.manufacturers)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
    <div className="h-screen">
        <br></br>
            <h2 className="text-4xl font-bold text-white">Manufacturers</h2>
        <br></br>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturers => {
                        return(
                            <tr key={manufacturers.id} className="border-b even:bg-gray-800 odd:bg-gray-900 border-gray-700 ">
                                <td className="px-6 py-4">
                                    { manufacturers.name }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default ManufacturerList;
