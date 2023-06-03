import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideMenu from './components/layout/Sidemenu';
import Contacts from './components/contacts/Contacts';
import Dashboard from './components/chartmap/Dashboard';
import AddContact from './components/contacts/AddContact';

function App() {
  return (
    <Router>
      <div className="flex">
        <SideMenu />
        <main className="p-4 flex-grow bg-gray-100">
          <Routes>
            <Route path="/" element={<Contacts/>} />
            <Route path="/chartmap" element={<Dashboard />} />
            <Route path="/addcontact" element={<AddContact />} />
            <Route path="/editcontact/:id" element={<AddContact />} />
          </Routes>
        </main>
        </div>
    </Router>
  );
}

export default App;
