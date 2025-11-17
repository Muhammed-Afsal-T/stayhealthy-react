import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const Landing_Page = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Check if user is logged in (has auth-token in sessionStorage)
    const isLoggedIn = sessionStorage.getItem("auth-token");
    
    if (isLoggedIn) {
      // User is logged in - navigate to Appointments
      navigate("/booking-consultation");
    } else {
      // User is not logged in - navigate to Signup
      navigate("/signup");
    }
  };

  return (
    <section className="hero-section">
      <div>
        <div data-aos="fade-up" className="flex-hero">
          <h1>
            Your Health<br/>
            <span className="text-gradient">
              Our Responsibility
            </span>
          </h1>
          <div className="blob-cont">
            <div className="blue blob"></div>
          </div>
          <div className="blob-cont">
            <div className="blue1 blob"></div>
          </div>
          <h4>
            "Breathe deeply, live fully Fuel your body with care. Stay active, stay inspired.Health is a way of life."
          </h4>
          <button className="button" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Landing_Page;