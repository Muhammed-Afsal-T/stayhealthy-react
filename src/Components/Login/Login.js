import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  // Function to fetch user profile after login
  const fetchUserProfile = async (authtoken, userEmail) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Email": userEmail,
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        // Store user details in sessionStorage
        sessionStorage.setItem("name", userData.name);
        sessionStorage.setItem("phone", userData.phone);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Profile fetch error:', error);
      return false;
    }
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
  };

  const login = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await res.json();
      console.log('Login response:', json);
      
      if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);
        
        const profileFetched = await fetchUserProfile(json.authtoken, email);
        
        if (!profileFetched) {
          console.log('Could not fetch user profile, using email as fallback');
        }
        
        navigate('/');
        window.location.reload();
      } else {
        if (json.errors) {
          for (const error of json.errors) {
            alert(error.msg);
          }
        } else {
          alert(json.error);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Network error - please try again');
    }
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text">
          Are you a new member? 
          <span>
            <Link to="/signup" style={{ color: '#2190FF' }}>
              Sign Up Here
            </Link>
          </span>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                name="email" 
                id="email" 
                className="form-control" 
                placeholder="Enter your email" 
                aria-describedby="helpId" 
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                aria-describedby="helpId"
                required
              />
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1">
                Login
              </button>
              <button type="button" className="btn btn-danger mb-2" onClick={handleReset}>
                Reset
              </button>
            </div>
            <br />
            <div className="login-text">
              Forgot Password?
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;