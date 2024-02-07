import React, { useEffect, useState } from "react";

function ListSales() {
    const [sales, setSales] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8090/api/sales/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    }
    async function handleClick(event, saleId) {
        const request = await fetch(`http://localhost:8090/api/sales/${saleId}`, {
        method: 'DELETE',
    });

        const response = await request.json();

        if (response.deleted) {
            alert('Sale deleted');
            fetchData();
        } else {
            alert('Sale not deleted');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (!sales) {
        return <div>Loading sales...</div>
      }
    
      return (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Price</th>
                <th>Automobile</th>
                <th>Sales Person</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => {
                return (
                  <tr key={ sale.id }>
                    <td>{ sale.price }</td>
                    <td>{ sale.automobile }</td>
                    <td>{ sale.sales_person }</td>
                    <td>{ sale.customer }</td>
                    <td>
                        <button onClick={(event) => handleClick(event, sale.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      );
    }
  
export default ListSales;
