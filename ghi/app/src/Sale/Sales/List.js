import { useState, useEffect} from 'react';

function SaleList() {
  const [sales, setSales] = useState([]);

  const getData = async () => {
    const response = await fetch('http://localhost:8090/api/sales/')

    if (response.ok) {
      const data = await response.json();
      setSales(data.sales)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="h-screen">
      <br></br>
      <h1 className="text-4xl font-bold text-white">Sales</h1>
      <br></br>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Salesperson</th>
                  <th scope="col" className="px-6 py-3">Customer</th>
                  <th scope="col" className="px-6 py-3">Automobile</th>
                  <th scope="col" className="px-6 py-3">Price</th>
              </tr>
          </thead>
          <tbody>
              {sales.map(sales => {
                  return(
                      <tr key={sales.id} className="border-b even:bg-gray-800 odd:bg-gray-900 border-gray-700">
                          <td className="px-6 py-4">{ sales.salesperson.employee_id }</td>
                          <td className="px-6 py-4">{ `${sales.salesperson.first_name} ${sales.salesperson.last_name}` }</td>
                          <td className="px-6 py-4">{ `${sales.customer.first_name} ${sales.customer.last_name}` }</td>
                          <td className="px-6 py-4">{ sales.automobile.vin }</td>
                          <td className="px-6 py-4">{ sales.price }</td>
                      </tr>
                  );
              })}
          </tbody>
        </table>
      </div>
    </div>
    );
  }

export default SaleList;

