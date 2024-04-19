import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { server, AuthContext } from "../context/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setUserDetail({
      ...userDetail,
      [event.target.name]: event.target.value,
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${server}/login`,
        { email: userDetail.email, password: userDetail.password },
        { withCredentials: true }
      );
      setIsAuthenticated(true);

      Cookies.set("tokenf", response.data.token, {
        expires: 1,
      });
      navigate(`/dashboard`);
      toast.success(`Logged in`);
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(`Login Failed`);
      }
      console.error("Login error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <h2>Sign in</h2>
          {!loading && (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={userDetail.email}
                onChange={handleChange}
                required
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={userDetail.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Login</button>
            </form>
          )}
          {loading && <div className="loader"></div>}
          <div className="signup-link">
            <a href="/signup">Don't have an account? Sign Up</a>
          </div>
        </div>
        <div className="login-image-container">
        </div>
      </div>
    </>
  );
};

export default LoginPage;
