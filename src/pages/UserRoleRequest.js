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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import {
  approveNewRoleRequest,
  rejectNewRoleRequest,
  getNewRoleRequests,
} from "../services/api";

const UserRoleRequest = () => {
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [roleToReject, setRoleToReject] = useState(null);

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

  const handleReject = async () => {
    if (roleToReject) {
      try {
        await rejectNewRoleRequest(roleToReject.id);
        setRoles((prev) => prev.filter((role) => role.id !== roleToReject.id));
        handleClose();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleClickOpen = (role) => {
    setRoleToReject(role);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRoleToReject(null);
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
            <TableCell align="center">Approve</TableCell>
            <TableCell align="center">Reject</TableCell>
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
                <Avatar src={role.identifyImageFront} alt="Front ID Image" />
              </TableCell>
              <TableCell>
                <Avatar src={role.identifyImageBack} alt="Back ID Image" />
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
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClickOpen(role)}
                >
                  ✗
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {hasMore && (
            <TableRow>
              <TableCell colSpan={9} align="center">
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
                      Load More
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Reject Role Request"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reject this role request? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReject} color="secondary" autoFocus>
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default UserRoleRequest;
