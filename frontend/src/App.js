// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreateRide from "./components/CreateRide";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import { LoadScript } from "@react-google-maps/api";
import ProtectedLayout from "./components/ProtectedLayout";
import AvailableRides from "./components/AvailableRides";
import MyRides from "./components/MyRides";
import EditRide from "./components/EditRide";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute> <ProtectedLayout><Dashboard /></ProtectedLayout> </ProtectedRoute>} />
          <Route path="/profile" element={  <ProtectedRoute> <ProtectedLayout> <Profile /></ProtectedLayout> </ProtectedRoute>}/>
          <Route path="/create-ride"element={ <ProtectedRoute> <ProtectedLayout> <CreateRide /> </ProtectedLayout> </ProtectedRoute> } />
          <Route path="/available-rides"element={ <ProtectedRoute> <ProtectedLayout> <AvailableRides /> </ProtectedLayout> </ProtectedRoute> } /> 
          <Route path="/my-rides"element={ <ProtectedRoute> <ProtectedLayout> <MyRides /> </ProtectedLayout> </ProtectedRoute> } /> 
          <Route path="/edit-ride/:id" element={<ProtectedRoute> <ProtectedLayout> <EditRide /> </ProtectedLayout></ProtectedRoute>} />

        </Routes>
      </Router>
    </LoadScript>
  );
}

export default App;
