import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/SignUp';
import Login from './Components/Login/Login';
import './App.css';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import FindDoctorSearch from './Components/FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './Components/DoctorCard/DoctorCard';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation'; // Add this import

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
          <Route path="/booking-consultation" element={<BookingConsultation/>}/> {/* Add this route */}
          
          {/* Test route for FindDoctorSearch component */}
          <Route path="/test-search" element={<FindDoctorSearch/>}/>
          {/* Test route for DoctorCard component */}
          <Route path="/test-doctorcard" element={
            <div style={{marginTop: '80px'}}> {/* Added margin to push below navbar */}
              <div className="test-doctor-cards">
                {/* Search Box at the top */}
                <div style={{marginBottom: '30px', width: '100%', maxWidth: '600px', margin: '0 auto 30px auto'}}>
                  <FindDoctorSearch />
                </div>
                
                {/* Heading with doctor count */}
                <div style={{textAlign: 'center', marginBottom: '20px'}}>
                  <h2 style={{fontWeight: 'bold', marginBottom: '10px'}}>
                    8 doctors available
                  </h2>
                  <h3 style={{fontWeight: 'bold'}}>
                    Book appointments with minimum wait-time & verified doctor details
                  </h3>
                </div>

                {/* Doctor Cards in row */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '20px',
                  maxWidth: '1200px',
                  margin: '0 auto'
                }}>
                  <DoctorCard 
                    name="Dr. Sarah Johnson"
                    specialty="Cardiologist"
                    experience="15"
                    rating="4.8"
                    image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
                    profile="Expert in cardiovascular diseases with over 15 years of experience."
                  />
                  <DoctorCard 
                    name="Dr. Michael Chen"
                    specialty="Neurologist"
                    experience="12"
                    rating="4.9"
                    image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
                    profile="Specialized in neurological disorders and brain health."
                  />
                  <DoctorCard 
                    name="Dr. Priya Sharma"
                    specialty="Pediatrician"
                    experience="10"
                    rating="4.7"
                    image="https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=150&h=150&fit=crop&crop=face"
                    profile="Dedicated to children's health and wellness."
                  />
                  <DoctorCard 
                    name="Dr. Robert Wilson"
                    specialty="Dermatologist"
                    experience="8"
                    rating="4.6"
                    image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
                    profile="Skin care specialist with advanced treatments."
                  />
                  <DoctorCard 
                    name="Dr. Lisa Anderson"
                    specialty="Gynecologist"
                    experience="14"
                    rating="4.9"
                    image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
                    profile="Women's health and wellness expert."
                  />
                  <DoctorCard 
                    name="Dr. David Brown"
                    specialty="Orthopedic"
                    experience="18"
                    rating="4.7"
                    image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
                    profile="Bone and joint specialist with surgical expertise."
                  />
                  <DoctorCard 
                    name="Dr. Maria Garcia"
                    specialty="Psychiatrist"
                    experience="11"
                    rating="4.8"
                    image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
                    profile="Mental health and therapy specialist."
                  />
                  <DoctorCard 
                    name="Dr. James Miller"
                    specialty="General Physician"
                    experience="16"
                    rating="4.5"
                    image="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
                    profile="Comprehensive primary care for all ages."
                  />
                </div>
              </div>
            </div>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;