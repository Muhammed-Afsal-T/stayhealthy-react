import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit, onClose }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [errors, setErrors] = useState({});

    const timeSlots = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
        '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', 
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        else if (!/^\d{10}$/.test(phoneNumber)) newErrors.phoneNumber = 'Phone must be 10 digits';
        if (!date) newErrors.date = 'Date is required';
        if (!selectedSlot) newErrors.selectedSlot = 'Time slot is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({ 
                name, 
                phoneNumber, 
                date, 
                timeSlot: selectedSlot,
                doctorName,
                doctorSpeciality
            });
            // Reset form
            setName('');
            setPhoneNumber('');
            setDate('');
            setSelectedSlot('');
            setErrors({});
        }
    };

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    return (
        <div className="appointment-form-overlay">
            <div className="appointment-form-container">
                <div className="appointment-form-header">
                    <h3>Book Appointment</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <div className="doctor-info">
                    <h4>Dr. {doctorName}</h4>
                    <p>{doctorSpeciality}</p>
                </div>

                <form onSubmit={handleFormSubmit} className="appointment-form">
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter 10-digit phone number"
                            className={errors.phoneNumber ? 'error' : ''}
                        />
                        {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date of Appointment:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={getTomorrowDate()}
                            className={errors.date ? 'error' : ''}
                        />
                        {errors.date && <span className="error-text">{errors.date}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="timeSlot">Book Time Slot:</label>
                        <select
                            id="timeSlot"
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className={errors.selectedSlot ? 'error' : ''}
                        >
                            <option value="">Select a time slot</option>
                            {timeSlots.map((slot, index) => (
                                <option key={index} value={slot}>{slot}</option>
                            ))}
                        </select>
                        {errors.selectedSlot && <span className="error-text">{errors.selectedSlot}</span>}
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="book-now-btn">Book Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AppointmentForm;