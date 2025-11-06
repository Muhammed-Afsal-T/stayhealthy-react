import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    
    const handleClick = () => setClick(!click);

    // Extract username from email (name before @)
    const extractUsername = (email) => {
        return email.split('@')[0];
    };

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("reviewFormData_")) {
                localStorage.removeItem(key);
            }
        }
        setEmail('');
        window.location.reload();
    }

    useEffect(() => { 
        const storedemail = sessionStorage.getItem("email");
        if (storedemail) {
            setIsLoggedIn(true);
            setUsername(storedemail);
            setEmail(storedemail);
        }
    }, []);

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">
                    STAY HEALTH 
                    <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{fill:'#3685fb'}}>
                        {/* Your SVG code */}
                    </svg>
                </Link>
                <span></span>
            </div>
            
            <div className="nav__icon" onClick={handleClick}>
                <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>

            <ul className={click ? 'nav__links active' : 'nav__links'}>
                <li className="link">
                    <Link to="/">Home</Link>
                </li>
                <li className="link">
                    <Link to="/search/doctors">Appointments</Link>
                </li>
                <li className="link">
                    <Link to="/healthblog">Health Blog</Link>
                </li>
                <li className="link">
                    <Link to="/reviews">Reviews</Link>
                </li>
                {isLoggedIn ? (
                    <>
                        {/* Display username next to logout button */}
                        <li className="link">
                            <span style={{
                                color: '#2190FF', 
                                fontWeight: 'bold',
                                marginRight: '10px'
                            }}>
                                Welcome, {extractUsername(username)}
                            </span>
                        </li>
                        <li className="link">
                            <button className="btn2" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="link">
                            <Link to="/signup">
                                <button className="btn1">Sign Up</button>
                            </Link>
                        </li>
                        <li className="link">
                            <Link to="/login">
                                <button className="btn1">Login</button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;