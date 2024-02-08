import React, { useState, useEffect} from 'react';

function SaleForm() {
  const [autos, setAutomobiles] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [automobile, setAutomobile] = useState('');
  const [salesperson, setSalesperson] = useState('');
  const [customer, setCustomer] = useState('');
  const [price, setPrice] = useState('');

  const handleAutomobileChange = (event) => {
    const value = event.target.value;
    setAutomobile(value);
  }

  const handleSalespersonChange = (event) => {
    const value = event.target.value;
    setSalesperson(value);
  }

  const handleCustomerChange = (event) => {
    const value = event.target.value;
    setCustomer(value);
  }

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  }

  const handleSubmit = async (event) => {
    console.log(handleSubmit);
    event.preventDefault();

    const data = {};
    data.automobile = automobile;
    data.salesperson = salesperson;
    data.customer = customer;
    data.price = price;

    const salesUrl = 'http://localhost:8090/api/sales/';
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(salesUrl, fetchConfig);
    if (response.ok) {

      setAutomobile('');
      setSalesperson('');
      setCustomer('');
      setPrice('');
    }
  }

  const getAutomobileData = async () => {
    const automobileUrl = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(automobileUrl);

    if (response.ok) {
      const data = await response.json();
      /*console.log('automobile data:', data);*/
      setAutomobiles(data.autos);
    }
  }

  const getPersonData = async () => {
    const salespersonUrl = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(salespersonUrl);
    if (response.ok) {
      const data = await response.json();
      /*console.log('salespeople data:', data);*/
      setSalespeople(data.salespeople);
    }
  }

  const getCustomerData = async () => {
    const customerUrl = 'http://localhost:8090/api/customers/';
    const response = await fetch(customerUrl);
    if (response.ok) {
      const data = await response.json();
      /*console.log('customer data:', data);*/
      setCustomers(data.customers);
    }
  }

  useEffect(() => {
    getAutomobileData();
    getPersonData();
    getCustomerData();

  }, []);

    return (
      <div className="h-screen">
        <div className="flex flex-col items-center">
        <br></br>
        <h1 className="text-4xl font-bold text-white">Add a Sale</h1>
        <br></br>
          <form onSubmit={handleSubmit} placeholder='Choose a VIN' className="flex flex-col flex-center bg-gray-800 rounded shadow-lg p-8" action="">
            <select value={automobile} onChange={handleAutomobileChange} required name="automobile" id="automobile" className="mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2">
              <option value="">Choose an Automobile VIN</option>
              {autos.map(automobile => {
                return (
                    <option className="text-white" key={automobile.vin} value={automobile.vin}>
                        {automobile.vin}
                    </option>
                );
            })}
            </select>
            <select value={salesperson} placeholder="Sales Rep" onChange={handleSalespersonChange} required name="salesperson" id="salesperson" className="mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2">
              <option value="">Choose a Salesperson</option>
              {salespeople.map(salesperson => {
                return (
                    <option className="text-white" key={salesperson.id} value={salesperson.id}>
                        {salesperson.first_name + ' ' + salesperson.last_name}
                    </option>
                );
            })}
            </select>
            <select value={customer} onChange={handleCustomerChange} required name="customer" id="customer" className="mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2">
              <option value="">Choose a Customer</option>
              {customers.map(customer => {
                return (
                    <option className="" key={customer.id} value={customer.id}>
                        {customer.first_name + ' ' + customer.last_name}
                    </option>
                );
            })}
            </select>
            <input value={price} onChange={handlePriceChange} placeholder="Price" required type="text" name="price" id="price" className="mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2"></input>
            <button className="flex items-center justify-center h-12 px-6 w-64 bg-cyan-700 mt-8 rounded font-semibold text-m text-blue-100 hover:bg-cyan-800">Create</button>
          </form>
        </div>
      </div>

    );
  }

export default SaleForm;
