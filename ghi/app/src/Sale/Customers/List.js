import { useState, useEffect} from 'react';

function CustomerList() {
    const [customers, setCustomers] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/customers/')

        if (response.ok) {
            const data = await response.json()
            setCustomers(data.customers)
        }
    }

    const handleDeleteButton = async (event) => {
        const { id } = event.target;
        const response = await fetch (`http://localhost:8090/api/customers/${id}`, {
            method: 'delete'
        })

        if (response.ok) {
            const data = await response.json();
            setCustomers(customers.filter(l => (l.id !== parseInt(id))));
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="h-screen">
            <br></br>
            <h1 className="text-4xl font-bold text-white">Customers</h1>
            <br></br>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">First Name</th>
                            <th scope="col" className="px-6 py-3">Last Name</th>
                            <th scope="col" className="px-6 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Phone Number</th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customers => {
                            return(
                                <tr key={customers.id} className="border-b even:bg-gray-800 odd:bg-gray-900 border-gray-700">
                                    <td className="px-6 py-4">{ customers.id }</td>
                                    <td className="px-6 py-4">{ customers.first_name }</td>
                                    <td className="px-6 py-4">{ customers.last_name }</td>
                                    <td className="px-6 py-4">{ customers.address }</td>
                                    <td className="px-6 py-4">{ customers.phone_number }</td>
                                    <td><button className="btn btn-danger" id={customers.id} onClick={handleDeleteButton}>Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
  }

export default CustomerList;
