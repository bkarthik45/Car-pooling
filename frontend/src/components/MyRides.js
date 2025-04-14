import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // ✅ You missed this import too

const MyRides = () => {
  const [rides, setRides] = useState([]);
  const navigate = useNavigate(); // ✅ Move inside here

  useEffect(() => {
    const fetchMyRides = async () => {
      try {
        const res = await API.get('/rides/my-rides');
        if (res.data.status === 'success') {
          setRides(res.data.rides);
        } else {
          toast.error('Failed to load your rides');
        }
      } catch (error) {
        toast.error('Something went wrong');
      }
    };

    fetchMyRides();
  }, []);

  const handleDelete = async (rideId) => {
    if (window.confirm("Are you sure you want to delete this ride?")) {
      try {
        const res = await API.delete(`/rides/${rideId}`);
        if (res.data.status === "success") {
          toast.success("Ride deleted");
          setRides(prev => prev.filter(r => r._id !== rideId));
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Error deleting ride");
        console.log(error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Your Posted Rides</h2>
      {rides.length === 0 && <p>You haven't posted any rides yet.</p>}
      {rides.map((ride) => (
        <div className="card my-3" key={ride._id}>
          <div className="card-body">
            <h5>{ride.pickupLocation} ➡️ {ride.destination}</h5>
            <p>Date: {new Date(ride.date).toLocaleDateString()}</p>
            <p>Time: {ride.time}</p>
            <p>Seats: {ride.seatsAvailable}</p>
            <p>Price: ₹{ride.pricePerSeat}</p>
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(ride._id)}>Delete</button>
            <button className="btn btn-warning btn-sm" onClick={() => navigate(`/edit-ride/${ride._id}`)}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRides;
