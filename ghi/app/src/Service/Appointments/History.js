import { useState, useEffect} from 'react';


function AppointmentsHistory() {

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }

  const [appointments, setAppointments] = useState([]);
  const [autos, setAutos] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  }

  const getAppointmentData = async () => {
    const resp = await fetch('http://localhost:8080/api/appointments/');
    if (resp.ok) {
      const data = await resp.json();
      setAppointments(data.appointments);
    }
  }

  const getAutoData = async () => {
    const resp = await fetch('http://localhost:8100/api/automobiles/');
    if (resp.ok) {
      const data = await resp.json();
      setAutos(data.autos);
    }
  }

  useEffect(() => {
    getAppointmentData();
    getAutoData();
  }, [])

    return (
      <>

<div className="h-screen">
        <br></br>
            <h2 className="text-4xl font-bold text-white">Appointments History</h2>
        <br></br>



    <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
        </div>
        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleFilterValueChange} value={filterValue} placeholder="Filter by VIN"/>
    </div>


        <br></br>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Vin</th>
                        <th scope="col" className="px-6 py-3">Is VIP?</th>
                        <th scope="col" className="px-6 py-3">Customer</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Time</th>
                        <th scope="col" className="px-6 py-3">Technician</th>
                        <th scope="col" className="px-6 py-3">Reason</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments
                    .filter((appointment) => appointment.vin.toLowerCase().includes(filterValue.toLowerCase()))
                    .map(appointment => {
                      let str = JSON.stringify(autos)
                        return(
                            <tr key={appointment.id} className="border-b even:bg-gray-800 odd:bg-gray-900 border-gray-700 ">
                                <td className="px-6 py-4">{ appointment.vin }</td>
                                <td className="px-6 py-4">{ ((str.includes(appointment.vin)) ? "Yes" : "No") }</td>
                                <td className="px-6 py-4">{ appointment.customer }</td>
                                <td className="px-6 py-4">{ appointment.date_time.split("T")[0] }</td>
                                <td className="px-6 py-4">{ formatTime(appointment.date_time.split("T")[1].split("+")[0]) }</td>
                                <td className="px-6 py-4">{ `${appointment.technician.first_name} ${appointment.technician.last_name}` }</td>
                                <td className="px-6 py-4">{ appointment.reason }</td>
                                <td className="px-6 py-4">{ appointment.status }</td>
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

export default AppointmentsHistory;

