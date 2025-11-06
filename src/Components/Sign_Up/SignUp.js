import React, { useState } from 'react';
import './Sign_Up.css';

const Sign_Up = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Add backend connectivity here later
    }
  };

  const handleReset = () => {
    setFormData({ name: '', phone: '', email: '', password: '' });
    setErrors({});
  };

  return (
    <div className="container" style={{marginTop: '5%'}}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{textAlign: 'left'}}>
          Already a member? <span><a href="/login" style={{color: '#2190FF'}}> Login</a></span>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                required 
                className="form-control" 
                placeholder="Enter your name" 
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input 
                type="tel" 
                name="phone" 
                id="phone" 
                required 
                className="form-control" 
                placeholder="Enter your phone number" 
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span style={{color: 'red'}}>{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                required 
                className="form-control" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                name="password" 
                id="password" 
                required 
                className="form-control" 
                placeholder="Enter your password" 
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
            </div>

            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1">Submit</button>
              <button type="button" onClick={handleReset} className="btn btn-danger mb-2">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;