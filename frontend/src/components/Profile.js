import React, { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: " ",
    phone: " ",
    isDriver: "false ",
    carModel: " ",
    carPlate: " ",
    seats: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile");
        if (res.data.status === "success") {
          setProfile(res.data.user);
        }
      } catch (error) {
        toast.error("failed to load profile ");
        console.log("data not loaded", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/profile", profile);
      if (res.data.status === "success") {
        toast.success("Profile updated successfully!");
        setProfile({
          name: "",
          email: "",
          phone: "",
          isDriver: false,
          carModel: "",
          carPlate: "",
          seats: "",
        });
      } else {
        toast.error(res.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={profile.name}
            onChange={handleChange}
            placeholder="Your name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={profile.email}
            placeholder="Your email"
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone "
            className="form-control"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
        </div>

        <div className="form-check mb-3">
  <input
    type="checkbox"
    className="form-check-input"
    id="isDriver"
    name="isDriver"
    checked={profile.isDriver}
    onChange={handleChange}    
  />
  <label className="form-check-label" htmlFor="isDriver">
    Are you a driver?
  </label>
</div>


        <div className="mb-3">
          <label className="form-label">Car Model</label>
          <input
            type="text"
            name="carModel"
            value={profile.carModel}
            onChange={handleChange}
            className="form-control"
            placeholder="e.g. Toyota Camry"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Car Plate</label>
          <input
            type="text"
            name="carPlate"
            className="form-control"
            value={profile.carPlate}
            onChange={handleChange}
            placeholder="e.g. AP09CD1234"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Seats Available</label>
          <input
            type="number"
            name="seats"
            className="form-control"
            value={profile.seats}
            onChange={handleChange}
            placeholder="e.g. 3"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
