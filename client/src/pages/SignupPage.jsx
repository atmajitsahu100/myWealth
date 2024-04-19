import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { server, AuthContext } from "../context/UserContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    setSignupData({
      ...signupData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@gmail.com$/;
    if (!emailPattern.test(signupData.email)) {
      toast.error("Please use a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${server}/sendOtp`,
        { email: signupData.email },
        { withCredentials: true }
      );
      toast.success(`Otp successfully send to your mail 📫`);
      console.log(response.data);
      setProgress(true);
    } catch (error) {
      toast.error(`Otp can't be send 📪`);
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${server}/signup`,
        { ...signupData, otp },
        { withCredentials: true }
      );
      console.log(response.data);
      toast.success(``);
    } catch (error) {
      toast.error(`invalid Otp ⛔ `);
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Signup Page</h1>
      {loading && <h1> Progress bar </h1>}
      {!loading && !progress && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={signupData.firstName}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={signupData.lastName}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={signupData.password}
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Sign Up</button>
        </form>
      )}
      {!loading && progress && (
        <form onSubmit={handleOtpSubmit}>
          <input
            type="number"
            placeholder="Enter OTP"
            name="otp"
            value={otp}
            onChange={handleOtpChange}
            pattern="[0-9]{6}"
            required
          />
          <br />
          <button type="submit">Verify OTP</button>
        </form>
      )}
      {!isAuthenticated && (
        <h4 style={{ margin: "20px", fontSize: "16px", color: "black" }}>
          Already Signed Up ? Login here
        </h4>
      )}

      {/* Login button */}
      <button onClick={() => navigate("/login")}>Log in here</button>
    </div>
  );
};

export default SignupPage;
