import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { login } from "../services/api";
import { HttpStatusCode } from "axios";
import localStorage from "../utils/localStorage";
import StorageKey from "../constants/storageKeys";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^[0-9]{10}$/; // Giả sử số điện thoại hợp lệ có 10 chữ số
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    if (!isValidPhoneNumber(phoneNumber)) {
      setError(
        "Invalid phone number. Please enter a valid 10-digit phone number.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await login(phoneNumber, password);
      if (response.status === HttpStatusCode.Ok) {
        const tempUserInfo = response?.data;
        localStorage.setItem(
          StorageKey.USER_INFOS,
          JSON.stringify(tempUserInfo),
        );
        localStorage.setItem(
          StorageKey.ACCESS_TOKEN,
          tempUserInfo.jwt.accessToken,
        );
        localStorage.setItem(
          StorageKey.REFRESH_TOKEN,
          tempUserInfo.jwt.refreshToken,
        );
        navigate("/add-category");
      } else if (response.status === HttpStatusCode.NotFound) {
        toast.warn("User not found");
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="phoneNumber"
        label="Phone Number"
        name="phoneNumber"
        autoComplete="phoneNumber"
        autoFocus
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>
    </Box>
  );
};

export default LoginForm;
