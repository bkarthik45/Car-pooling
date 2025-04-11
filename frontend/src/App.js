import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateRide from './components/CreateRide'
import { ToastContainer } from 'react-toastify';
import Profile from './components/Profile';
import { LoadScript } from '@react-google-maps/api';

function App() {
  return (

    <LoadScript
  googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
  libraries={['places']} // 👈 this is REQUIRED
>
<Router>
<ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
       <Route path="/dashboard" element={<Dashboard/>} /> 
       <Route path = "/profile" element = {<Profile/>} />
       <Route path="/create-ride" element={<CreateRide />} />
      </Routes>
    </Router> 
    </LoadScript> )
}

export default App;
