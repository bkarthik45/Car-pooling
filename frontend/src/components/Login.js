import React, { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"; // or './App.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", { email, password });
      if (res.data.status === "Success") {
        localStorage.setItem("token", res.data.token);
        toast.success("Login Successful");
        navigate("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="auth-card">
        <h3 className="auth-title">Log In</h3>
        <p className="auth-subtitle">Create an car account</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="auth-btn w-100 text-white" type="submit">
          Login in 
          </button>
        </form>

        <p>
          Don't have an account ?{" "}
          <a href="/signup" className="link-navy">
            Sign up
          </a>
        </p>

        <div className="text-center mt-3">
          <p>Sign in with · Google 🔒 ⚠️</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
