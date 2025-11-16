import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = () => {
    const [username, setUsername] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        localStorage.removeItem("doctorData");
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("reviewFormData_")) {
                localStorage.removeItem(key);
            }
        }
        window.location.reload();
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    useEffect(() => { 
        const storedName = sessionStorage.getItem("name");
        const storedEmail = sessionStorage.getItem("email");
        if (storedName) {
            setUsername(storedName); 
        } else if (storedEmail) {
            setUsername(storedEmail.split('@')[0]); 
        }
    }, []);

    return (
        <div className="profile-card-container">
          
            <div className="dropdown-container" ref={dropdownRef}>
                <span 
                    className="username-dropdown"
                    onClick={toggleDropdown}
                >
                    Welcome, {username}
                </span>
                
                {/* Dropdown Menu */}
                <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                    <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        Your Profile
                    </Link>
                    <Link to="/reports" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                        Your Reports
                    </Link>
                </div>
            </div>
            
            {/* Logout Button */}
            <button className="btn2" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default ProfileCard;