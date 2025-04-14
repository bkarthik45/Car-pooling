import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import MapModal from "./MapModal";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUserCircle,
  FaRupeeSign,
  FaChair,
} from "react-icons/fa";
import { getUserIdFromToken } from "../utils/getUserIdFromToken"; // 🧠 Add this at the top

const AvailableRides = () => {
  const userId = getUserIdFromToken(); // ⬅️ inside component

  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await API.get("/rides");
        if (res.data.status === "success") {
          setRides(res.data.rides);
        } else {
          toast.error("Failed to fetch rides");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    };

    fetchRides();
  }, []);

  const handleJoinRide = async (rideId) => {
    try {
      const res = await API.post(`/rides/${rideId}/book`);
      if (res.data.status === "success") {
        toast.success("Successfully joined ride");
        setRides((prev) =>
          prev.map((r) =>
            r._id === rideId ? { ...r, seatsAvailable: r.seatsAvailable - 1 } : r
          )
        );
      } else {
        toast.error(res.data.message); // Backend will send correct reason
      }
    } catch (error) {
      console.error("Join Ride Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  

  return (
    <div className="container mt-4">
      <h2>Available Rides</h2>
      {rides.map((ride) => (
        <div className="card my-3" key={ride._id}>
          <div className="card-body">
            <h5 className="mb-3">
              <FaMapMarkerAlt className="me-2 text-primary" />
              <strong>{ride.pickupLocation}</strong> ➡️{" "}
              <strong>{ride.destination}</strong>
            </h5>

            <p>
              <FaClock className="me-2 text-secondary" />
              <span>
                <strong>Date:</strong>{" "}
                {new Date(ride.date).toLocaleDateString()} |{" "}
                <strong>Time:</strong> {ride.time}
              </span>
            </p>

            <p>
              <FaChair className="me-2 text-info" />
              <span>
                <strong>Seats Available:</strong> {ride.seatsAvailable}
              </span>
            </p>

            <p>
              <FaRupeeSign className="me-2 text-warning" />
              <span>
                <strong>Price per Seat:</strong> ₹{ride.pricePerSeat}
              </span>
            </p>

            <p>
              <FaUserCircle className="me-2 text-success" />
              <span>
                <strong>Posted By:</strong> {ride.postedBy?.name || "Unknown"}
              </span>
            </p>
            {ride.postedBy._id !== userId && ride.seatsAvailable > 0 && (
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => handleJoinRide(ride._id)}
              >
                Join Ride
              </button>
            )}

            {ride.seatsAvailable === 0 && (
              <span className="badge bg-danger ms-2">🚫 Full</span>
            )}

            <button
              className="btn btn-outline-primary btn-sm mt-2"
              onClick={() =>
                setSelectedRide({
                  pickup: ride.pickupLocation,
                  destination: ride.destination,
                })
              }
            >
              View Map
            </button>
          </div>
        </div>
      ))}

      {selectedRide && (
        <MapModal
          show={!!selectedRide}
          onHide={() => setSelectedRide(null)}
          pickup={selectedRide.pickup}
          destination={selectedRide.destination}
        />
      )}
    </div>
  );
};

export default AvailableRides;
