import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { server, AuthContext } from "../context/UserContext";
import CircularProgress from "@mui/material/CircularProgress";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
    <>
    <Container component="main" maxWidth="xs">
     <Grid container justifyContent="center" alignItems="center" > 
        <Grid item >
        <Box          
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
            <Typography variant="h5" component="h1" gutterBottom>
              Signup
            </Typography>
            {loading && <CircularProgress size={100} />}
            {!loading && !progress && (
               <Box
               component="form"
               noValidate
               onSubmit={handleSubmit}
               sx={{ mt: 3 }}
             >
               <Grid container spacing={2}>
                 <Grid item xs={12} sm={6}>
                   <TextField
                     autoComplete="given-name"
                     name="firstName"
                     required
                     fullWidth
                     id="firstName"
                     label="First Name"
                     value={signupData.firstName}
                     onChange={handleChange}
                     autoFocus
                     size="small"
                   />
                 </Grid>
                 <Grid item xs={12} sm={6}>
                   <TextField
                     required
                     fullWidth
                     id="lastName"
                     label="Last Name"
                     name="lastName"
                     value={signupData.lastName}
                     onChange={handleChange}
                     autoComplete="family-name"
                     size="small"
                   />
                 </Grid>
                 <Grid item xs={12}>
                   <TextField
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     value={signupData.email}
                     onChange={handleChange}
                     size="small"
                   />
                 </Grid>
                 <Grid item xs={12}>
                   <TextField
                     type={showPassword ? "text" : "password"}
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     id="password"
                     value={signupData.password}
                     onChange={handleChange}
                     autoComplete="new-password"
                     size="small"
                   />
                 </Grid>
               </Grid>
               <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 sx={{ mt: 3, mb: 2 }}
               >
                 Sign Up
               </Button>
               <Grid container justifyContent="flex-end">
                 <Grid item>
                   <Link href="/login" variant="body2">
                     Already have an account? Sign in
                   </Link>
                 </Grid>
               </Grid>
             </Box>
            )}
            {!loading && progress && (
              <form onSubmit={handleOtpSubmit}>
                <TextField
                  label="Enter OTP"
                  variant="outlined"
                  type="number"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  fullWidth
                  margin="normal"
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]{6}",
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "10px" }}
                >
                  Verify OTP
                </Button>
              </form>
            )}
            {/* Login button */}
          </Box>
        </Grid>
      </Grid>
      </Container>

  
    </>
  );
};

export default SignupPage;
