import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

const ReviewRow = ({ serialNumber, doctorName, doctorSpeciality, appointmentId, isEven }) => {
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [patientName, setPatientName] = useState(''); // NEW: Name state
    const [review, setReview] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Check if review already exists
    useEffect(() => {
        const storedReview = localStorage.getItem(`review_${appointmentId}`);
        if (storedReview) {
            setIsSubmitted(true);
        }
    }, [appointmentId]);

    const handleOpenForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setRating(0);
        setPatientName(''); 
        setReview('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const reviewData = {
            doctorName,
            doctorSpeciality,
            patientName, 
            rating,
            review,
            appointmentId,
            date: new Date().toISOString()
        };
        
        localStorage.setItem(`review_${appointmentId}`, JSON.stringify(reviewData));
        setIsSubmitted(true);
        setShowForm(false);
    };

    return (
        <div className={`review-row ${isEven ? 'row-even' : 'row-odd'}`}>
            <div>{serialNumber}</div>
            <div>Dr. {doctorName}</div>
            <div>{doctorSpeciality}</div>
            <div>
                {isSubmitted ? (
                    <span className="review-given">Review Given</span>
                ) : (
                    <button className="review-button" onClick={handleOpenForm}>
                        Click Here
                    </button>
                )}
            </div>
            <div className="review-status">
                {isSubmitted ? 'Review Given' : 'No review yet'}
            </div>
            

            {showForm && (
                <div className="review-modal-overlay">
                    <div className="review-modal">
                        <div className="review-modal-header">
                            <h3>Provide Feedback</h3>
                            <button className="close-button" onClick={handleCloseForm}>×</button>
                        </div>
                        
                        <div className="doctor-info">
                            <h4>Dr. {doctorName}</h4>
                            <p>{doctorSpeciality}</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="review-form">
                            
                            <div className="form-group">
                                <label htmlFor="patientName">Your Name:</label>
                                <input
                                    id="patientName"
                                    type="text"
                                    value={patientName}
                                    onChange={(e) => setPatientName(e.target.value)}
                                    placeholder="Enter your name"
                                    required
                                    className="name-input"
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Rating:</label>
                                <div className="rating-stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${star <= rating ? 'filled' : ''}`}
                                            onClick={() => setRating(star)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="review">Your Review:</label>
                                <textarea
                                    id="review"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Share your experience with the doctor..."
                                    rows="4"
                                    required
                                />
                            </div>
                            
                            <div className="form-actions">
                                <button type="button" onClick={handleCloseForm} className="cancel-btn">
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};


const ReviewForm = () => {
    const doctors = [
        {
            id: 1,
            name: "John Doe",
            specialty: "Cardiology",
            appointmentId: "review-001"
        },
        {
            id: 2, 
            name: "Jane Smith",
            specialty: "Dermatology",
            appointmentId: "review-002"
        },
        {
            id: 3,
            name: "Mike Johnson",
            specialty: "Pediatrics", 
            appointmentId: "review-003"
        }
    ];

    return (
    <div className="mobile-content-spacing"> 
        <div className="reviews-page-container">
            <h2 className="reviews-title">Reviews</h2>
            
            {/* Table Header */}
            <div className="reviews-table-header">
                <div>Serial Number</div>
                <div>Doctor Name</div>
                <div>Doctor Speciality</div>
                <div>Provide Feedback</div>
                <div>Review Given</div>
            </div>

            {/* Separator Line */}
            <div className="table-separator"></div>

            {/* Doctor Rows */}
            {doctors.map((doctor, index) => (
                <ReviewRow 
                    key={doctor.id}
                    serialNumber={doctor.id}
                    doctorName={doctor.name}
                    doctorSpeciality={doctor.specialty}
                    appointmentId={doctor.appointmentId}
                    isEven={index % 2 === 0}
                />
            ))}

            
            <div className="table-separator"></div>
        </div>
    </div>
    );
};

export default ReviewForm;