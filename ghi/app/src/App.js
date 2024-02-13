import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespeopleList from './Sale/Employees/List';
import SalespeopleForm from './Sale/Employees/Form';
import CustomerList from './Sale/Customers/List';
import CustomerForm from './Sale/Customers/Form';
import SaleList from './Sale/Sales/List';
import SaleForm from './Sale/Sales/Form';
import SaleHistory from './Sale/Sales/History';
import ManufacturerList from './Inventory/Manufacturers/List';
import ManufacturerForm from './Inventory/Manufacturers/Form';
import AutomobilesList from './Inventory/Automobiles/List';
import AutomobileForm from './Inventory/Automobiles/Form';
import ModelsList from './Inventory/Vehicles/List';
import ModelForm from './Inventory/Vehicles/Form';
// import TechnicianForm from './Service/Technicians/Form';
// import TechniciansList from './Service/Technicians/List';
// import AppointmentForm from './Service/Appointments/Form';
// import AppointmentsList from './Service/Appointments/List';
// import AppointmentHistory from './Service/Appointments/History';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
              <Route path="new" element={<ManufacturerForm />} ></Route>
              <Route path="" element={<ManufacturerList />} ></Route>
          </Route>
          <Route path="models">
              <Route path="new" element={<ModelForm />} ></Route>
              <Route path="" element={<ModelsList />} ></Route>
            </Route>
          <Route path="automobiles">
              <Route path="new" element={<AutomobileForm />} ></Route>
              <Route path="" element={<AutomobilesList />} ></Route>
          </Route>
          <Route path="salespeople">
            <Route path="" element={<SalespeopleList />} />
            <Route path="new" element={<SalespeopleForm />} />
          </Route>
          <Route path="customers">
            <Route path="" element={<CustomerList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route path="" element={<SaleList />} />
            <Route path="new" element={<SaleForm />} />
            <Route path="history" element={<SaleHistory />} />
          </Route>
          <Route path="technicians">
              <Route path="new" element={<TechnicianForm />} ></Route>
              <Route path="" element={<TechniciansList />} ></Route>
          </Route>
          <Route path="appointments">
              <Route path="new" element={<AppointmentForm />} ></Route>
              <Route path="" element={<AppointmentsList />} ></Route>
              <Route path="history" element={<AppointmentHistory />} ></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
