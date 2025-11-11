import React, { useState } from 'react';
import './FindDoctorSearch.css';

const FindDoctorSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [specialities, setSpecialities] = useState([
    'Dentist', 'Gynecologist', 'General Physician', 'Dermatologist', 
    'Pediatrician', 'Neurologist', 'Orthopedic', 'Cardiologist'
  ]);
  const [showSpecialities, setShowSpecialities] = useState(false);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSpecialityClick = (speciality) => {
    setSearchText(speciality);
    setShowSpecialities(false);
  };

  const handleFocus = () => {
    setShowSpecialities(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSpecialities(false), 200);
  };

  return (
    <div className="find-doctor-search">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for doctors, specialties..."
          value={searchText}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        {showSpecialities && (
          <div className="specialities-dropdown">
            {specialities.map((speciality, index) => (
              <div
                key={index}
                className="speciality-item"
                onClick={() => handleSpecialityClick(speciality)}
              >
                {speciality}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctorSearch;