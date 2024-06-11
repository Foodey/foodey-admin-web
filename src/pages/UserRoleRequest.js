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
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

import { approveNewRoleRequest, getNewRoleRequests } from "../services/api";

const UserRoleRequest = () => {
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const getRoles = async (slice) => {
    setLoading(true);
    try {
      const result = await getNewRoleRequests(slice);
      const newRoles = result.content;
      setRoles((prev) => [...prev, ...newRoles]);
      setHasMore(!result.last);
    } catch (error) {
      console.error("Failed to load roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveNewRoleRequest(id);
      setRoles((prev) => prev.filter((role) => role.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

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
          {hasMore && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Box display="flex" justifyContent="center" alignItems="center">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (!loading) {
                          setPage((prev) => prev + 1);
                        }
                      }}
                      disabled={loading}
                    >
                      Generate More
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserRoleRequest;
