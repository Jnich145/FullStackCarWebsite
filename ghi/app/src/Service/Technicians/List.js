import { useState, useEffect} from 'react';

function TechniciansList() {
  const [technicians, setTechnicians] = useState([]);

  const getData = async () => {
    const resp = await fetch('http://localhost:8080/api/technicians/');
    if (resp.ok) {
      const data = await resp.json();
      setTechnicians(data.technicians);
    }
  }

  useEffect(() => {
    getData();
  }, [])

    return (
      <>

<div className="h-screen">
        <br></br>
            <h2 className="text-4xl font-bold text-white">Technicians</h2>
        <br></br>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">First name</th>
                        <th scope="col" className="px-6 py-3">Last name</th>
                        <th scope="col" className="px-6 py-3">Employee id</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map(technician => {
                        return(
                            <tr key={technician.employee_id} className="border-b even:bg-gray-800 odd:bg-gray-900 border-gray-700 ">
                                <td className="px-6 py-4">{ technician.first_name }</td>
                                <td className="px-6 py-4">{ technician.last_name }</td>
                                <td className="px-6 py-4">{ technician.employee_id }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>

      </>
    );
  }

  export default TechniciansList;
