import { useState, useEffect} from 'react';

function AutomobilesList() {
  const [autos, setAutomobiles] = useState([]);
  const [sales, setSales] = useState([]);

  const getAutos = async () => {
    const resp = await fetch('http://localhost:8100/api/automobiles/');
    if (resp.ok) {
      const data = await resp.json();
      setAutomobiles(data.autos);
    }
  }

  const getSales = async () => {
    const resp = await fetch('http://localhost:8090/api/sales/');
    if (resp.ok) {
      const data = await resp.json();
      setSales(data.sales);
    }
  }

  useEffect(() => {
    getAutos();
    getSales();
  }, [])

    return (
      <>

<div className="h-screen">
        <br></br>
            <h2 className="text-4xl font-bold text-white">Automobiles</h2>
        <br></br>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Vin</th>
                        <th scope="col" className="px-6 py-3">Color</th>
                        <th scope="col" className="px-6 py-3">Year</th>
                        <th scope="col" className="px-6 py-3">Model</th>
                        <th scope="col" className="px-6 py-3">Manufacturer</th>
                        <th scope="col" className="px-6 py-3">Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {autos.map(auto => {
                      let str = JSON.stringify(sales);
                        return(
                            <tr key={auto.vin} className="border-b even:bg-gray-800 odd:bg-gray-900 border-gray-700 ">
                                <td className="px-6 py-4">{ auto.vin }</td>
                                <td className="px-6 py-4">{ auto.color }</td>
                                <td className="px-6 py-4">{ auto.year }</td>
                                <td className="px-6 py-4">{ auto.model.name }</td>
                                <td className="px-6 py-4">{ auto.model.manufacturer.name }</td>
                                <td className="px-6 py-4">{ ((str.includes(auto.vin)) ? "Yes" : "No") }</td>
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

  export default AutomobilesList;
