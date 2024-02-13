import { useState, useEffect} from 'react';

function ModelsList() {
  const [models, setModels] = useState([]);

  const getData = async () => {
    const resp = await fetch('http://localhost:8100/api/models/');
    if (resp.ok) {
      const data = await resp.json();
      setModels(data.models);
    }
  }

  useEffect(() => {
    getData();
  }, [])

    return (
      <>

<div className="h-screen">
        <br></br>
            <h2 className="text-4xl font-bold text-white">Models</h2>
        <br></br>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Manufacturer</th>
                        <th scope="col" className="px-6 py-3">Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => {
                        return(
                            <tr key={model.href} className="border-b even:bg-gray-800 odd:bg-gray-900 border-gray-700 ">
                                <td className="px-6 py-4">{ model.name }</td>
                                <td className="px-6 py-4">{ model.manufacturer.name }</td>
                                <td className="px-6 py-4"><img src={ model.picture_url } width="170" height="110" /></td>
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

  export default ModelsList;

