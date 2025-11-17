import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ProfileCard from "../ProfileCard/ProfileCard";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleClick = () => setClick(!click);

    useEffect(() => { 
        const storedemail = sessionStorage.getItem("email");
        if (storedemail) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">
                    STAY HEALTH 
                    <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{fill:'#3685fb'}}>
                        
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
                    <Link to="/booking-consultation">Appointments</Link>
                </li>
                <li className="link">
                    <Link to="/healthblog">Health Blog</Link>
                </li>
                <li className="link">
                    <Link to="/reviewform">Reviews</Link>
                </li>
                
                {isLoggedIn ? (
                    <li className="link">
                        <ProfileCard />
                    </li>
                ) : (
                    <>
                        <li className="link">
                            <Link to="/signup">
                                <button className="btn1">SignUp</button>
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