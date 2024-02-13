import { useState, useEffect} from 'react';

function AppointmentsList() {

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }

  const [appointments, setAppointments] = useState([]);
  const [autos, setAutos] = useState([]);

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

  const handleCancel = async (event) => {
    event.preventDefault();

    const cancelUrl = `http://localhost:8080/api/appointments/${event.target.id}/cancel/`;
    const fetchConfig = {
        method: "put",
    };

    const response = await fetch(cancelUrl, fetchConfig);
    if (response.ok) {
        alert("successfully cancelled")
    }
  };

  const handleFinish = async (event) => {
    event.preventDefault();

    const finishUrl = `http://localhost:8080/api/appointments/${event.target.id}/finish/`;
    const fetchConfig = {
        method: "put",
    };

    const response = await fetch(finishUrl, fetchConfig);
    if (response.ok) {
        alert("successfully finished")
    }
  };


  useEffect(() => {
    getAppointmentData();
    getAutoData();
  }, [])

    return (
      <>

<div className="h-screen">
        <br></br>
            <h2 className="text-4xl font-bold text-white">Appointments</h2>
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
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                      let str = JSON.stringify(autos);
                        return(
                            <tr key={appointment.id} className="border-b even:bg-gray-800 odd:bg-gray-900 border-gray-700 ">
                                <td className="px-6 py-4">{ appointment.vin }</td>
                                <td className="px-6 py-4">{ ((str.includes(appointment.vin)) ? "Yes" : "No") }</td>
                                <td className="px-6 py-4">{ appointment.customer }</td>
                                <td className="px-6 py-4">{ appointment.date_time.split("T")[0] }</td>
                                <td className="px-6 py-4">{ formatTime(appointment.date_time.split("T")[1].split("+")[0]) }</td>
                                <td className="px-6 py-4">{ `${appointment.technician.first_name} ${appointment.technician.last_name}` }</td>
                                <td className="px-6 py-4">{ appointment.reason }</td>
                                <td className="px-6 py-4">
                                  <button className="border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700" onClick={handleCancel} id={appointment.id}>Cancel</button>
                                  <button className="focus:outline-none text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-green-600 hover:bg-green-700 dark:focus:ring-green-800" onClick={handleFinish} id={appointment.id}>Finish</button>
                                </td>
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
export default AppointmentsList;
