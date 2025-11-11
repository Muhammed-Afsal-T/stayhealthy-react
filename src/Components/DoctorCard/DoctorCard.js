import React, { useState } from 'react';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';

const DoctorCard = ({ name, specialty, experience, rating, image, profile }) => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const handleBookAppointment = () => {
    setShowAppointmentForm(true);
  };

  const handleCloseForm = () => {
    setShowAppointmentForm(false);
  };

  const handleFormSubmit = (appointmentData) => {
    console.log('Appointment booked:', appointmentData);
    // Here you would typically send data to backend
    alert(`Appointment booked with Dr. ${name} for ${appointmentData.date} at ${appointmentData.timeSlot}`);
    setShowAppointmentForm(false);
  };

  return (
    <>
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
          
          {/* Book Appointment Button */}
          <div>
            <button className='book-appointment-btn' onClick={handleBookAppointment}>                    
              <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>
          </div>
        </div>
      </div>

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <AppointmentForm
          doctorName={name}
          doctorSpeciality={specialty}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}
    </>
  );
};

export default DoctorCard;