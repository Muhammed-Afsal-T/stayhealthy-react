import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({ name, specialty, experience, rating, image, profile }) => {
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
        
        {/* Book Appointment Button */}
        <div>
          <button className='book-appointment-btn'>                    
            <div>Book Appointment</div>
            <div>No Booking Fee</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;