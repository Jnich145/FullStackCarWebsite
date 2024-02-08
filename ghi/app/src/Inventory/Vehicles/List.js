import { useState, useEffect} from 'react';

function ModelForm() {
  const [manufacturers, setManufacturers] = useState([]);

  const [name, setName] = useState('');
  const [picture_url, setPictureUrl] = useState('');
  const [manufacturer, setManufacturer] = useState('');


  const handleNameChange = (event) => {
      const value = event.target.value;
      setName(value);
  }

  const handlePictureUrlChange = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
  }

  const handleManufacturerChange = (event) => {
    const value = event.target.value;
    setManufacturer(value);
  }

  const handleSubmit = async (event) => {
      event.preventDefault();

      const data = {};
      data.name = name;
      data.picture_url = picture_url;
      data.manufacturer_id = manufacturer;
      console.log(data)

      const modelsUrl = 'http://localhost:8100/api/models/';
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          },
      };

      const response = await fetch(modelsUrl, fetchConfig);
      if (response.ok) {
          setName('');
          setPictureUrl('');
          setManufacturer('');
      }
  };

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/manufacturers/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers)
    }
  }

  useEffect(() => {
      fetchData();
  }, []);




  return (

<div className="h-screen">
    <div className="flex flex-col items-center">
    <br></br>
    <h2 className="text-4xl font-bold text-white">Add a Model</h2>
    <br></br>
        <form onSubmit={handleSubmit} className="flex flex-col flex-center bg-gray-800 rounded shadow-lg p-8" action="">
            <input value={name} onChange={handleNameChange} className="text-white mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2" type="text" placeholder="Model Name" required/>
            <input value={picture_url} onChange={handlePictureUrlChange} className="text-white mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2" type="text" placeholder="Picture URL" required/>

            <select onChange={handleManufacturerChange} className="text-white mb-2 flex items-center h-12 px-4 w-64 bg-gray-600 mt-2 rounded focus:outline-none focus:ring-2">
                <option>Choose a manufacturer</option>
                    {manufacturers.map(manufacturer => {
                        return (
                            <option className="text-white" key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                    );
                })}
            </select>

            <button className="flex items-center justify-center h-12 px-6 w-64 bg-cyan-700 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-cyan-800">Create</button>
        </form>
    </div>
</div>

  );
}

export default ModelForm;
