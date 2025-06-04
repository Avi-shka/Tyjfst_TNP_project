import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/root/home/Home';
import Home2 from './components/root/home/Home2';
import Login from './components/root/user/login';
import Signup from './components/root/user/Signup';
import Header from './components/Header';
import  Navbar from './components/Navbar';
import AboutUs from './components/aboutus';
import Register from './components/root/user/sturegister';
import Latestcompany from './components/root/home/latestcompany';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    fetch('http://localhost:8080/tnpbackend/logout', 
      { method: 'POST', }) .then((response) =>
         response.text()) .then((data) => 
          { if (data === 'Logout successful')
             { setIsLoggedIn(false); }
              else { alert(data); } }); };

  return (
    <Router> <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> 
    <Routes> 
      <Route path="/login" element={<Login setIsLoggedIn={handleLogin} />} /> 
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home2 />} /> 
      <Route path="/home" element={<Home />} />
      <Route path="/latestcom" element={<Latestcompany />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/stuprofile" element={<Register />} />
      </Routes>
      </Router>
  );
}

export default App;
