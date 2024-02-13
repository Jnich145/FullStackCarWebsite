import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="bg-cyan-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ml-4">
        <div className="flex h-17">
          <div className="flex-shrink-0 flex items-center">
            <NavLink className="font-bold text-xl" to="/">CarCar</NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-8 flex items-baseline my-3 space-x-2">

            <button id="dropdownDefaultButton1" data-dropdown-toggle="dropdown1" className="text-white bg-black-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 text-center inline-flex items-center dark:bg-cyan-950 dark:hover:bg-cyan-800 dark:focus:ring-cyan-950" type="button">Inventory <svg className="w-4 h-6 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                <div id="dropdown1" className="z-10 hidden bg-gray divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton1">
                    <li>
                      <NavLink className="block px-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/manufacturers">Manufacturers</NavLink>
                      <NavLink className="block px-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/manufacturers/new">Add a Manufacturer</NavLink>
                      <NavLink className="block px-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/models">Models</NavLink>
                      <NavLink className="block px-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/models/new">Add a Model</NavLink>
                      <NavLink className="block px-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/automobiles">Automobiles</NavLink>
                      <NavLink className="block px-1 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/automobiles/new">Add an Automobile</NavLink>
                    </li>
                  </ul>
                </div>

                <button id="dropdownDefaultButton2" data-dropdown-toggle="dropdown2" className="text-white bg-black-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 text-center inline-flex items-center dark:bg-cyan-950 dark:hover:bg-cyan-800 dark:focus:ring-cyan-950" type="button">Service <svg className="w-4 h-6 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                <div id="dropdown2" className="z-10 hidden bg-gray divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton2">
                    <li>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/technicians">Technicians List</NavLink>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/technicians/new">Create a Technician</NavLink>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/appointments">Appointments List</NavLink>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/appointments/new">Create an Appointment</NavLink>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/appointments/history">Appointments History</NavLink>
                    </li>
                  </ul>
                </div>

                <button id="dropdownDefaultButton3" data-dropdown-toggle="dropdown3" className="text-white bg-black-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 text-center inline-flex items-center dark:bg-cyan-950 dark:hover:bg-cyan-800 dark:focus:ring-cyan-950" type="button">Sales <svg className="w-4 h-6 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
                <div id="dropdown3" className="z-10 hidden bg-gray divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton3">
                    <li>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/salespeople">Salespeople</NavLink>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/salespeople/new">Add a Salesperson</NavLink>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/customers">Customers</NavLink>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/customers/new">Add a Customer</NavLink>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/sales">Sales</NavLink>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/sales/new">Add a Sale</NavLink>
                      <NavLink className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" to="/sales/history">Salesperson History</NavLink>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}


export default Nav;
