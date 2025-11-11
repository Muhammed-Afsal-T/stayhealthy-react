import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/SignUp';
import Login from './Components/Login/Login';
import './App.css';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing_Page/>}/>
          <Route path="/signup" element={<Sign_Up/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/instant-consultation" element={<InstantConsultation/>}/>
          {/* Test route for FindDoctorSearch component */}
          <Route path="/test-search" element={<FindDoctorSearch/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;