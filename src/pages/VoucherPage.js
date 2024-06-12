import React from "react";
import { Container, Typography, Box } from "@mui/material";
import VoucherList from "../components/VoucherList";
import AddVoucherForm from "../components/AddVoucherForm";

const VoucherPage = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Voucher Management
        </Typography>
        <VoucherList />
      </Box>
    </Container>
  );
};

export default VoucherPage;
