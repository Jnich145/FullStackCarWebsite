import { useEffect, useState } from "react";

function SalespeopleList() {
    const [salespeople, setSalespeople] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/')

        if (response.ok) {
            const data = await response.json()
            setSalespeople(data.salespeople)
        }
    }

    const handleDeleteButton = async (event) => {
        const { id } = event.target;
        const response = await fetch (`http://localhost:8090/api/salespeople/${id}`, {
            method: 'delete'
        })

        if (response.ok) {
            const data = await response.json();
            setSalespeople(salespeople.filter(l => (l.id !== parseInt(id))));
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className="h-screen">
            <br></br>
            <h1 className="text-4xl font-bold text-white">Salespeople</h1>
            <br></br>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">First Name</th>
                            <th scope="col" className="px-6 py-3">Last Name</th>
                            <th scope="col" className="px-6 py-3">Employee ID</th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespeople.map(salesperson => {
                            return (
                                <tr key={salesperson.id} className="border-b even:bg-gray-800 odd:bg-gray-900 border-gray-700">
                                    <td className="px-6 py-4">{ salesperson.id }</td>
                                    <td className="px-6 py-4">{ salesperson.first_name }</td>
                                    <td className="px-6 py-4">{ salesperson.last_name }</td>
                                    <td className="px-6 py-4">{ salesperson.employee_id }</td>
                                    <td><button className="btn btn-danger" id={salesperson.id} onClick={handleDeleteButton}>Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalespeopleList;
