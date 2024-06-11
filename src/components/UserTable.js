import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
} from "@mui/material";

import { approveNewRoleRequest, getNewRoleRequests } from "../services/api";

const UserTable = () => {
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);

  const getRoles = async (slice) => {
    const result = await getNewRoleRequests(slice);
    const newRoles = result.content;
    setRoles((prev) => [...prev, ...newRoles]);
  };

  const handleApprove = async (id) => {};

  useEffect(() => {
    getRoles(page);
  }, [page]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">User Id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Request Role</TableCell>
            <TableCell align="center">Front ID Image</TableCell>
            <TableCell align="center">Back ID Image</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((role, index) => (
            <TableRow key={role.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{role.userId}</TableCell>
              <TableCell>{role.userName}</TableCell>
              <TableCell>{role.userPhoneNumber}</TableCell>
              <TableCell>{role.role}</TableCell>
              <TableCell>
                <Avatar src={role.frontIdImage} alt="Front ID Image" />
              </TableCell>
              <TableCell>
                <Avatar src={role.backIdImage} alt="Back ID Image" />
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleApprove(role.id)}
                >
                  ✓
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={8} align="center">
              <Button
                variant="contained"
                onClick={() => {
                  setPage((prev) => prev + 1);
                }}
              >
                Generate More
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
