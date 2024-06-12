import React, { useEffect, useState } from "react";
import { getVouchers } from "../services/api";
import AddVoucherForm from "./AddVoucherForm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import VoucherDetail from "./VoucherDetail"; // Import VoucherDetail component

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null); // State to track selected voucher

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        // const result = await getVouchers();
        // setVouchers(result);
      } catch (err) {
        console.error("Failed to fetch vouchers", err);
      }
    };
    fetchVouchers();
  }, []);

  // Function to handle click on Details button
  const handleDetailsClick = (voucher) => {
    setSelectedVoucher(voucher);
  };

  return (
    <Box mb={4}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddForm(!showAddForm)}
        sx={{ marginBottom: 2 }}
      >
        {showAddForm ? "Hide Add Voucher Form" : "Show Add Voucher Form"}
      </Button>
      {showAddForm && <AddVoucherForm />}
      <Typography variant="h5" gutterBottom>
        Voucher List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Activation</TableCell>
              <TableCell>Expiry</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vouchers.map((voucher) => (
              <TableRow key={voucher.id}>
                <TableCell>{voucher.code}</TableCell>
                <TableCell>{voucher.name}</TableCell>
                <TableCell>{voucher.discountAmount}</TableCell>
                <TableCell>
                  {new Date(voucher.activationDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(voucher.expiryDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleDetailsClick(voucher)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Render selected voucher details */}
      {selectedVoucher && <VoucherDetail voucher={selectedVoucher} />}
    </Box>
  );
};

export default VoucherList;
