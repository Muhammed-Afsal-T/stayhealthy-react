import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({ name, specialty, experience, rating, image, profile }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    // Remove the appointment from state
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
    
    // Close the popup
    setShowModal(false);
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    setAppointments([newAppointment]); // Replace with new appointment
    setShowModal(false); // Close modal after booking
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
            className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}
            onClick={handleBooking}
          >
            {appointments.length > 0 ? (
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
            {appointments.length > 0 ? (
              <div className="appointment-booked-section">
                <h3 style={{ textAlign: 'center', margin: '20px 0', color: '#4caf50' }}>
                  ✅ Appointment Booked!
                </h3>
                {appointments.map((appointment) => (
                  <div className="booked-info" key={appointment.id}>
                    <p><strong>Name:</strong> {appointment.name}</p>
                    <p><strong>Phone:</strong> {appointment.phoneNumber}</p>
                    <p><strong>Date:</strong> {appointment.date}</p>
                    <p><strong>Time:</strong> {appointment.timeSlot}</p>
                    <button 
                      className="cancel-btn"
                      onClick={() => handleCancel(appointment.id)}
                    >
                      Cancel Appointment
                    </button>
                  </div>
                ))}
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