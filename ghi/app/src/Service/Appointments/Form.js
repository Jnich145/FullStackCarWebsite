import { useState, useEffect} from 'react';

function AppointmentForm() {
  const [technicians, setTechnicians] = useState([]);

  const [vin, setVin] = useState('');
  const [customer, setCustomer] = useState('');
  const [date_time, setDateTime] = useState('');
  const [technician, setTechnician] = useState('');
  const [reason, setReason] = useState('');

  const handleVinChange = (event) => {
      const value = event.target.value;
      setVin(value);
  }

  const handleCustomerChange = (event) => {
    const value = event.target.value;
    setCustomer(value);
  }

  const handleDateTimeChange = (event) => {
    const value = event.target.value;
    setDateTime(value);
  }

  const handleTechnicianChange = (event) => {
    const value = event.target.value;
    setTechnician(value);
  }

  const handleReasonChange = (event) => {
    const value = event.target.value;
    setReason(value);
  }

  const handleSubmit = async (event) => {
      event.preventDefault();

      const data = {};
      data.vin = vin;
      data.customer = customer;
      data.date_time = date_time;
      data.technician = technician;
      data.reason = reason;

      const appointmentsUrl = 'http://localhost:8080/api/appointments/';
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          },
      };

      const response = await fetch(appointmentsUrl, fetchConfig);
      if (response.ok) {

          setVin('');
          setCustomer('');
          setDateTime('');
          setTechnician('');
          setReason('');
      }
  };

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/technicians/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setTechnicians(data.technicians)
    }
  }

  useEffect(() => {
      fetchData();
  }, []);




  return (

<div className="h-screen">
    <div className="flex flex-col items-center">
    <br></br>
    <h2 className="text-4xl font-bold text-white">Create an Appointment</h2>
    <br></br>
        <form onSubmit={handleSubmit} className="flex flex-col flex-center bg-gray-800 rounded shadow-lg p-8" action="">
            <input value={vin} onChange={handleVinChange} className="mb-2 text-white flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2" type="text" placeholder="Vin" required/>
            <input value={customer} onChange={handleCustomerChange} className="mb-2 text-white flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2" type="text" placeholder="Customer" required/>
            <input value={date_time} onChange={handleDateTimeChange} className="mb-2 text-white flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2" type="datetime-local" placeholder="Date and Time" required/>

            <select onChange={handleTechnicianChange} className="text-white mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2">
                <option>Choose a technican</option>
                    {technicians.map(technician => {
                        return (
                            <option className="text-white" key={technician.employee_id} value={technician.employee_id}>
                                {technician.first_name + ' ' + technician.last_name}
                            </option>
                    );
                })}
            </select>

            <input value={reason} onChange={handleReasonChange} className="mb-2 text-white flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2" type="text" placeholder="Reason" required/>
            <button className="flex items-center justify-center h-12 px-6 w-64 bg-cyan-700 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-cyan-800">Create</button>
        </form>
    </div>
</div>

  );
}

export default AppointmentForm;
