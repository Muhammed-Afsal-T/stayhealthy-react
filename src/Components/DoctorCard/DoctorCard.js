import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({ name, specialty, experience, rating, image, profile }) => {
  const [showModal, setShowModal] = useState(false);
  const [hasAppointment, setHasAppointment] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  // Check if this doctor has an appointment when component loads
  useEffect(() => {
    checkForAppointment();
    
    // Listen for appointment changes
    const handleAppointmentChange = () => {
      checkForAppointment();
    };

    window.addEventListener('appointmentChange', handleAppointmentChange);
    
    return () => {
      window.removeEventListener('appointmentChange', handleAppointmentChange);
    };
  }, [name]);

  const checkForAppointment = () => {
    const appointmentKey = `appointment_${name}`;
    const storedAppointment = localStorage.getItem(appointmentKey);
    
    if (storedAppointment) {
      try {
        const data = JSON.parse(storedAppointment);
        if (data.appointmentData) {
          setHasAppointment(true);
          setCurrentAppointment(data.appointmentData);
          return;
        }
      } catch (error) {
        console.log('Error parsing appointment data:', error);
      }
    }
    
    setHasAppointment(false);
    setCurrentAppointment(null);
  };

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    // Remove appointment data from localStorage
    localStorage.removeItem(`appointment_${name}`);
    
    // Update state
    setHasAppointment(false);
    setCurrentAppointment(null);
    
    // Trigger notification update
    window.dispatchEvent(new Event('appointmentChange'));
    
    // Close the popup
    setShowModal(false);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    
    // Store appointment data for notification
    localStorage.setItem(`appointment_${appointmentData.doctorName}`, JSON.stringify({
      appointmentData: newAppointment,
      timestamp: new Date().toISOString()
    }));
    
    // Update state
    setHasAppointment(true);
    setCurrentAppointment(newAppointment);
    
    // Close modal
    setShowModal(false);
    
    // Trigger notification update
    window.dispatchEvent(new Event('appointmentChange'));
  };

  const handleClosePopup = () => {
    setShowModal(false);
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card-image">
        <img src={image} alt={name} />
      </div>
      
      <div className="doctor-card-details-container">
        <div className="doctor-card-details">
          <h3 className="doctor-name">{name}</h3>
          <p className="doctor-specialty">{specialty}</p>
          <p className="doctor-experience">{experience} years experience</p>
          <div className="doctor-rating">
            <span className="rating-stars">⭐ {rating}</span>
          </div>
          <p className="doctor-profile">{profile}</p>
        </div>
        
        {/* Book/Cancel Appointment Button */}
        <div className="doctor-card-options-container">
          <button 
            className={`book-appointment-btn ${hasAppointment ? 'cancel-appointment' : ''}`}
            onClick={handleBooking}
          >
            {hasAppointment ? (
              <div>Cancel Appointment</div>
            ) : (
              <div>Book Appointment</div>
            )}
            <div>No Booking Fee</div>
          </button>
        </div>

        {/* Popup Modal */}
        <Popup
          open={showModal}
          closeOnDocumentClick={false}
          onClose={handleClosePopup}
          modal
          nested
        >
          <div className="appointment-popup-content">
            <button className="popup-close" onClick={handleClosePopup}>×</button>
            
            <div className="popup-doctor-info">
              <div className="popup-doctor-image">
                <img src={image} alt={name} />
              </div>
              <div className="popup-doctor-details">
                <h3 className="popup-doctor-name">{name}</h3>
                <p className="popup-doctor-specialty">{specialty}</p>
                <p className="popup-doctor-experience">{experience} years experience</p>
                <div className="popup-doctor-rating">
                  <span className="rating-stars">⭐ {rating}</span>
                </div>
              </div>
            </div>

            {/* Show booked appointments OR booking form */}
            {hasAppointment ? (
              <div className="appointment-booked-section">
                <h3 style={{ textAlign: 'center', margin: '20px 0', color: '#4caf50' }}>
                  ✅ Appointment Booked!
                </h3>
                {currentAppointment && (
                  <div className="booked-info">
                    <p><strong>Name:</strong> {currentAppointment.name}</p>
                    <p><strong>Phone:</strong> {currentAppointment.phoneNumber}</p>
                    <p><strong>Date:</strong> {currentAppointment.date}</p>
                    <p><strong>Time:</strong> {currentAppointment.timeSlot}</p>
                    <button 
                      className="cancel-btn"
                      onClick={() => handleCancel(currentAppointment.id)}
                    >
                      Cancel Appointment
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <AppointmentForm 
                doctorName={name} 
                doctorSpeciality={specialty} 
                onSubmit={handleFormSubmit} 
                onClose={handleClosePopup}
              />
            )}
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;