import React, { useState } from 'react';
import './Signup.css';

function Signup() {
    const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/tnpbackend/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        fullName,
        email,
        password,
        role,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
      });
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
        <div> 
            <label>Full Name:</label>
             <input type="text" value={fullName} onChange={(e) =>
                 setFullName(e.target.value)} required /> 
                 </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Role:</label>
        <div>
          <input
            type="radio"
            id="student"
            name="role"
            value="student"
            checked={role === 'student'}
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="student">Student</label>
        </div>
        <div>
          <input
            type="radio"
            id="admin"
            name="role"
            value="admin"
            checked={role === 'admin'}
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="admin">Admin</label>
        </div>
      </div>
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
