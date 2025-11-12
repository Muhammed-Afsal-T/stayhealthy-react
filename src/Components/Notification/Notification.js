import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState(null);

    useEffect(() => {
        checkForAppointments();
        
        const handleAppointmentChange = () => {
            checkForAppointments();
        };

        window.addEventListener('appointmentChange', handleAppointmentChange);
        
        return () => {
            window.removeEventListener('appointmentChange', handleAppointmentChange);
        };
    }, []);

    const checkForAppointments = () => {
        const keys = Object.keys(localStorage);
        let foundAppointment = null;
        
        keys.forEach(key => {
            if (key.startsWith('appointment_')) {
                try {
                    const storedData = localStorage.getItem(key);
                    if (storedData) {
                        const data = JSON.parse(storedData);
                        if (data.appointmentData) {
                            foundAppointment = data.appointmentData;
                        }
                    }
                } catch (error) {
                    console.log('Error parsing appointment data:', error);
                }
            }
        });

        if (foundAppointment) {
            setAppointmentDetails(foundAppointment);
            setShowNotification(true);
        } else {
            setShowNotification(false);
            setAppointmentDetails(null);
        }
    };

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    if (!showNotification || !appointmentDetails) {
        return <>{children}</>;
    }

    return (
        <div className="notification-container">
            {children}
            
            <div className="notification-banner">
                <div className="notification-content">
                    <div className="notification-header">
                        <h3>Appointment Details</h3>
                        <button 
                            className="notification-close"
                            onClick={handleCloseNotification}
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="appointment-details">
                        <p><strong>Doctor:</strong> {appointmentDetails.doctorName}</p>
                        <p><strong>Speciality:</strong> {appointmentDetails.doctorSpeciality}</p>
                        <p><strong>Name:</strong> {appointmentDetails.name}</p>
                        <p><strong>Phone Number:</strong> {appointmentDetails.phoneNumber}</p>
                        <p><strong>Date of Appointment:</strong> {appointmentDetails.date}</p>
                        <p><strong>Time Slot:</strong> {appointmentDetails.timeSlot}</p>
                    </div>
                    
                    <div className="notification-actions">
                        <small>This notification will disappear when you cancel the appointment</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;