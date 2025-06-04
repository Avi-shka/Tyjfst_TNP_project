import React, { useState } from 'react';
import './register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    cgpa: '',
    percentage_10th: '',
    percentage_12th: '',
    deadBacklogs: '',
    liveBacklogs: '',
    branch: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setFormData({ ...formData, profilePicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:8080/tnpbackend/register', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Form data submitted successfully!');
      } else {
        console.error('Error submitting form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="container form-container">
      <div className="form-header">
        <h2>Sign Up for T&P Cell</h2>
        <p className="text-muted">Fill in your details to create an account</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email ID</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact Number */}
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">Contact Number</label>
          <input
            type="tel"
            className="form-control"
            id="contact"
            name="contact"
            pattern="[0-9]{10}"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        {/* CGPA */}
        <div className="mb-3">
          <label htmlFor="cgpa" className="form-label">CGPA</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="cgpa"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
            required
          />
        </div>

        {/* 10th Marks */}
        <div className="mb-3">
          <label htmlFor="percentage_10th" className="form-label">10th Marks (%)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="percentage_10th"
            name="percentage_10th"
            value={formData.percentage_10th}
            onChange={handleChange}
            required
          />
        </div>

        {/* 12th Marks */}
        <div className="mb-3">
          <label htmlFor="percentage_12th" className="form-label">12th Marks (%)</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="percentage_12th"
            name="percentage_12th"
            value={formData.percentage_12th}
            onChange={handleChange}
            required
          />
        </div>

        {/* Backlogs */}
        <div className="mb-3">
          <label className="form-label">Backlogs</label>
          <div className="row">
            <div className="col">
              <input
                type="number"
                className="form-control"
                id="deadBacklogs"
                name="deadBacklogs"
                placeholder="Dead Backlogs"
                value={formData.deadBacklogs}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                id="liveBacklogs"
                name="liveBacklogs"
                placeholder="Live Backlogs"
                value={formData.liveBacklogs}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Branch */}
        <div className="mb-3">
          <label htmlFor="branch" className="form-label">Branch</label>
          <select
            className="form-select"
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Branch</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>
        </div>

        {/* Profile Picture */}
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
          <input
            type="file"
            className="form-control"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
