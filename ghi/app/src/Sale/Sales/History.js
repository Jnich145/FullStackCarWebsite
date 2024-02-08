import { useState, useEffect} from 'react';

function SaleHistory() {
  const [sales, setSales] = useState([]);
  const [salespeople, setSalespeople] = useState([]);

  const [salesperson, setSalesperson] = useState('');

  const handleSalespersonChange = (event) => {
    const value = event.target.value;
    setSalesperson(value);
  }


  const getSalesData = async () => {
    const salesUrl = ('http://localhost:8090/api/sales/')
    const response = await fetch(salesUrl);
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales)
    }
  }

  const getSalespeopleData = async () => {
    const salespersonUrl = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(salespersonUrl);
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespeople);
    }
  }


  useEffect(() => {
    getSalesData();
    getSalespeopleData();
  }, [])


    return (
      <div className="h-screen">
        <br></br>
        <h1 className="text-4xl font-bold text-white">Sales History</h1>
        <br></br>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <select value={salesperson} onChange={handleSalespersonChange} required name="salespeople" id="salespeople" className="text-white mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2">
              <option value="">Choose a Salesperson</option>
                {salespeople.map(salesperson => {
                  return (
                    <option className="text-white" key={salesperson.employee_id} value={salesperson.employee_id}>
                      {salesperson.first_name + ' ' + salesperson.last_name}
                    </option>
                  );
                })}
          </select>
        </div>
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Salesperson</th>
              <th scope="col" className="px-6 py-3">Customer</th>
              <th scope="col" className="px-6 py-3">VIN</th>
              <th scope="col" className="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {sales.filter((sale) => sale.salesperson.employee_id === parseInt(salesperson)).map(sale => {
              return (
                <tr key={sale.id} className="border-b even:bg-gray-800 odd:bg-gray-900 border-gray-700">
                  <td className="px-6 py-4">{ `${sale.salesperson.first_name} ${sale.salesperson.last_name}` }</td>
                  <td className="px-6 py-4">{ `${sale.customer.first_name} ${sale.customer.last_name}` }</td>
                  <td className="px-6 py-4">{ sale.automobile.vin }</td>
                  <td className="px-6 py-4">{ sale.price }</td>
                </tr>
              );
            })}
          </tbody>
      </table>
    </div>
  );
}

export default SaleHistory;

