import React, { useState } from 'react';
import './BookingConsultation.css';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorCard from '../DoctorCard/DoctorCard';

const BookingConsultation = () => {
    const [doctors, setDoctors] = useState([
        {
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist", 
            experience: "15",
            rating: "4.8",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
            profile: "Expert in cardiovascular diseases with over 15 years of experience."
        },
        {
            name: "Dr. Michael Chen",
            specialty: "Neurologist",
            experience: "12", 
            rating: "4.9",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            profile: "Specialized in neurological disorders and brain health."
        },
        {
            name: "Dr. Priya Sharma",
            specialty: "Pediatrician",
            experience: "10",
            rating: "4.7",
            image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=150&h=150&fit=crop&crop=face",
            profile: "Dedicated to children's health and wellness."
        },
        {
            name: "Dr. Robert Wilson",
            specialty: "Dermatologist",
            experience: "8",
            rating: "4.6",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            profile: "Skin care specialist with advanced treatments."
        },
        {
            name: "Dr. Lisa Anderson",
            specialty: "Gynecologist", 
            experience: "14",
            rating: "4.9",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
            profile: "Women's health and wellness expert."
        },
        {
            name: "Dr. David Brown",
            specialty: "Orthopedic",
            experience: "18",
            rating: "4.7",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            profile: "Bone and joint specialist with surgical expertise."
        },
        {
            name: "Dr. Maria Garcia",
            specialty: "Psychiatrist",
            experience: "11",
            rating: "4.8",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
            profile: "Mental health and therapy specialist."
        },
        {
            name: "Dr. James Miller",
            specialty: "General Physician",
            experience: "16",
            rating: "4.5",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            profile: "Comprehensive primary care for all ages."
        }
    ]);

    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(
                (doctor) =>
                    doctor.specialty.toLowerCase().includes(searchText.toLowerCase()) ||
                    doctor.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };

    return (
        <div className="booking-consultation-container">
            {/* Search Section */}
            <div className="search-section">
                <FindDoctorSearch onSearch={handleSearch} />
            </div>

            {/* Results Section */}
            <div className="search-results-container">
                {isSearched ? (
                    <div className="results-header">
                        <h2>{filteredDoctors.length} doctors available</h2>
                        <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                        
                        {filteredDoctors.length > 0 ? (
                            <div className="doctors-grid">
                                {filteredDoctors.map((doctor, index) => (
                                    <DoctorCard 
                                        key={index}
                                        name={doctor.name}
                                        specialty={doctor.specialty}
                                        experience={doctor.experience}
                                        rating={doctor.rating}
                                        image={doctor.image}
                                        profile={doctor.profile}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="no-doctors">No doctors found. Please try a different search.</p>
                        )}
                    </div>
                ) : (
                    <div className="default-view">
                        <h2>Find and Book Your Doctor</h2>
                        <h3>Search for specialists and book appointments instantly</h3>
                        
                        <div className="all-doctors-grid">
                            {doctors.map((doctor, index) => (
                                <DoctorCard 
                                    key={index}
                                    name={doctor.name}
                                    specialty={doctor.specialty}
                                    experience={doctor.experience}
                                    rating={doctor.rating}
                                    image={doctor.image}
                                    profile={doctor.profile}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingConsultation;