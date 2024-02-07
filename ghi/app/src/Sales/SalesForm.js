import React, { useState, useEffect } from 'react';

function SalesForm() {
    const [automobile, setAutomobile] = useState([]);
    const [sales, setSales] = useState([]);
    const [formData, setFormData] = useState({
        price: '',
        vin: '',
        customer: '',
        sales_person: '',
    })

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        try {
            const response = await fetch(url);
    
            if (response.ok) {
                const data = await response.json();
                setAutomobile(data.automobiles);
            } else {
                console.error('Error fetching automobiles:', response.status);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const url = 'http://localhost:8090/api/sales/';

        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            setFormData({
                price: '',
                vin: '',
                customer: '',
                sales_person: '',
            });
        }
    }

    const handleFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }
    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>New Sale</h1>
              <form onSubmit={handleSubmit} id="create-sale-form">
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.price} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
                  <label htmlFor="price">Price</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} value={formData.sales_person} placeholder="sales_person" required type="sales_person" name="sales_person" id="sales_person" className="form-control" />
                  <label htmlFor="sales_person">Sales person</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={handleFormChange} value={formData.customer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                    <label htmlFor="customer">Customer</label>
                </div>
                <div className="mb-3">
                    <select onChange={handleFormChange} value={formData.vin} required name="vin" id="vin" className="form-select">
                        <option value=''>VIN</option>
                        {sales.map(sale => {
                            return (
                                <option key={automobile.vin} value={automobile.vin}>{automobile.vin}</option>
                            )
                        }
                        )}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      );
    }

export default SalesForm;
