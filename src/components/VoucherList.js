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
  const [openDetails, setOpenDetails] = useState(false); // State to track if the details modal is open
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const result = await getVouchers(page);
        setVouchers((prevVouchers) => [...prevVouchers, ...result.content]);
        setHasMore(!result.last); // Update hasMore based on whether we received vouchers
      } catch (err) {
        console.error("Failed to fetch vouchers", err);
      }
    };
    fetchVouchers();
  }, [page]);

  // Function to handle click on Details button
  const handleDetailsClick = (voucher) => {
    setSelectedVoucher(voucher);
    setOpenDetails(true);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
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
              <TableCell>Method</TableCell>
              <TableCell>Type</TableCell>
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
                <TableCell>{voucher.method}</TableCell>
                <TableCell>{voucher.type}</TableCell>
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
      {/* Render Load More button */}
      {hasMore && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoadMore}
          sx={{ marginTop: 2 }}
        >
          Load More
        </Button>
      )}
      {/* Render VoucherDetail modal */}
      {selectedVoucher && (
        <VoucherDetail
          voucher={selectedVoucher}
          open={openDetails}
          onClose={handleCloseDetails}
        />
      )}
    </Box>
  );
};

export default VoucherList;
