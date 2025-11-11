import React, { useState } from 'react';
import './FindDoctorSearch.css';

const FindDoctorSearch = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const specialties = [
        'Cardiologist',
        'Neurologist', 
        'Pediatrician',
        'Dermatologist',
        'Gynecologist',
        'Orthopedic',
        'Psychiatrist',
        'General Physician'
    ];

    const doctorNames = [
        'Dr. Sarah Johnson',
        'Dr. Michael Chen',
        'Dr. Priya Sharma',
        'Dr. Robert Wilson',
        'Dr. Lisa Anderson',
        'Dr. David Brown',
        'Dr. Maria Garcia',
        'Dr. James Miller'
    ];

    const allSuggestions = [...specialties, ...doctorNames];

    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
        setShowSuggestions(text.length > 0);
        
        // AUTO-SEARCH: Trigger search immediately when typing
        if (onSearch) {
            onSearch(text);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchText(suggestion);
        setShowSuggestions(false);
        if (onSearch) {
            onSearch(suggestion);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onSearch && searchText.trim()) {
            onSearch(searchText);
        }
        setShowSuggestions(false);
    };

    const handleInputFocus = () => {
        if (searchText.length > 0) {
            setShowSuggestions(true);
        }
    };

    const handleInputBlur = () => {
        setTimeout(() => setShowSuggestions(false), 200);
    };

    // Clear search when input becomes empty
    const handleInputChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
        setShowSuggestions(text.length > 0);
        
        if (onSearch) {
            onSearch(text); // This will trigger search with empty text when cleared
        }
    };

    const filteredSuggestions = allSuggestions.filter(item =>
        item.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="find-doctor-search">
            <form onSubmit={handleSearchSubmit} className="search-form">
                <div className="search-input-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by doctor name or specialty..."
                        value={searchText}
                        onChange={handleInputChange} // Use the new handler
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    <button type="submit" className="search-icon-button">
                        🔍
                    </button>
                </div>
                
                {/* Suggestions dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="suggestions-dropdown">
                        {filteredSuggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="suggestion-option"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
};

export default FindDoctorSearch;