import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import clsx from "clsx";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Endpoint from "./endpoints";
import { publicRequest } from "./utils/request";
import { HttpStatusCode } from "axios";
import localStorage from "./utils/localStorage";
import StorageKey from "./constants/storageKeys";

// pages
import VoucherPage from "./pages/VoucherPage";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import UserRoleRequest from "./pages/UserRoleRequest";
import LoginPage from "./pages/LoginPage";

const login = async (data) => {
  try {
    const response = await publicRequest.post(Endpoint.LOGIN, data);
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
          <Button color="inherit" component={Link} to="/vouchers">
            Vouchers
          </Button>
          <Button color="inherit" component={Link} to="/categories">
            Categories
          </Button>
          <Button color="inherit" component={Link} to="/user-role-requests">
            New Role Requests
          </Button>
          {/* <Button color="inherit" component={Link} to="/login"> */}
          {/*   Login */}
          {/* </Button> */}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/vouchers" element={<VoucherPage />} />
        <Route path="/user-role-requests" element={<UserRoleRequest />} />
        <Route path="/categories" element={<ProductCategoryPage />} />
        <Route path="/login" element={<LoginPage />} />
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
