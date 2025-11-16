import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        phone: "",
        email: ""
    });
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
            navigate("/login");
        } else {
            // Get user details from sessionStorage
            const storedName = sessionStorage.getItem("name");
            const storedPhone = sessionStorage.getItem("phone");
            const storedEmail = sessionStorage.getItem("email");
            
            setUserDetails({
                name: storedName || "",
                phone: storedPhone || "",
                email: storedEmail || ""
            });
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");
            
            if (!authtoken || !email) {
                navigate("/login");
                return;
            }

            // Update sessionStorage with new values
            sessionStorage.setItem("name", userDetails.name);
            sessionStorage.setItem("phone", userDetails.phone);
            
            // Show success message
            alert("Profile Updated Successfully!");
            setEditMode(false);
            
        } catch (error) {
            console.error('Profile update error:', error);
            alert("Failed to update profile");
        }
    };

    const handleCancel = () => {
        // Reload original data from sessionStorage
        const storedName = sessionStorage.getItem("name");
        const storedPhone = sessionStorage.getItem("phone");
        const storedEmail = sessionStorage.getItem("email");
        
        setUserDetails({
            name: storedName || "",
            phone: storedPhone || "",
            email: storedEmail || ""
        });
        setEditMode(false);
    };

    return (
        <div className="profile-page-container">
            <div className="profile-header">
                <h1>Your Profile</h1>
            </div>
            
            <div className="profile-container">
                {editMode ? (
                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={userDetails.name}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={userDetails.phone}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={userDetails.email}
                                onChange={handleInputChange}
                                className="form-input"
                                disabled // Email cannot be changed
                            />
                        </div>

                        <div className="form-actions">
                            <button type="button" onClick={handleCancel} className="cancel-btn">
                                Cancel
                            </button>
                            <button type="submit" className="save-btn">
                                Save
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="profile-details">
                        <div className="form-group">
                            <label>Name:</label>
                            <div className="display-input">
                                {userDetails.name}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Phone:</label>
                            <div className="display-input">
                                {userDetails.phone}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email:</label>
                            <div className="display-input">
                                {userDetails.email}
                            </div>
                        </div>

                        <button onClick={handleEdit} className="edit-btn">
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;