import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/SignUp';
import Login from './Components/Login/Login';
import './App.css';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import Profile from './Components/Profile/Profile';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';
import HealthBlog from './Components/HealthBlog/HealthBlog';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Landing_Page/>}/>
            <Route path="/signup" element={<Sign_Up/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/booking-consultation" element={<BookingConsultation/>}/>
            <Route path="/test-search" element={<FindDoctorSearch/>}/>
            <Route path="/reviewform" element={<ReviewForm/>}/>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/reports" element={<ReportsLayout/>}/>
            <Route path="/healthblog" element={<HealthBlog/>}/>
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;