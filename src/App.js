import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import UserRoleRequest from "./pages/UserRoleRequest";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import AuthEndpoint from "./endpoints/authEndpoints";
import clsx from "clsx";
import { publicRequest } from "./utils/request";
import { HttpStatusCode } from "axios";
import localStorage from "./utils/localStorage";
import StorageKey from "./constants/storageKeys";

const login = async (data) => {
  try {
    const response = await publicRequest.post(AuthEndpoint.LOGIN, data);
    if (response.status === HttpStatusCode.Ok) {
      const tempUserInfo = response?.data;
      localStorage.setItem(StorageKey.USER_INFOS, JSON.stringify(tempUserInfo));
      localStorage.setItem(
        StorageKey.ACCESS_TOKEN,
        tempUserInfo.jwt.accessToken,
      );
      localStorage.setItem(
        StorageKey.REFRESH_TOKEN,
        tempUserInfo.jwt.refreshToken,
      );
    } else if (response.status === HttpStatusCode.NotFound) {
      console.log("User not found");
    } else {
      console.log("Error");
    }
  } catch (err) {
    console.log(err);
  }
};

const App = () => {
  login({
    password: "Admin123",
    phoneNumber: "0975639978",
  });
  return (
    <Router>
      <AppBar position="static">
        <Toolbar className={clsx("grid", "wide")}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            User Role Management
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/user-role-requests">
            New Role Requests
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-role-requests" element={<UserRoleRequest />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
};

export default App;
