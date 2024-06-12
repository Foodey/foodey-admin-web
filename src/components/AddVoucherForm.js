import React, { useState } from "react";
import { addVoucher } from "../services/api";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";

const voucherMethods = ["PERCENTAGE", "SPECIAL_AMOUNT"];
const voucherTypes = ["PRODUCT", "CATEGORY"];

const AddVoucherForm = () => {
  const [voucher, setVoucher] = useState({
    code: "",
    name: "",
    description: "",
    image: "",
    discountAmount: 0,
    activationDate: "",
    expiryDate: "",
    method: "",
    type: "",
    shopVsBrandId: "",
    appliedCategoryIds: "",
    appliedProductIds: "",
    minimumBuyingQuantity: 1,
    minimumDistanceFromStore: 0,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setVoucher({ ...voucher, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.code = voucher.code ? "" : "Code is required";
    tempErrors.name = voucher.name ? "" : "Name is required";
    tempErrors.discountAmount =
      voucher.discountAmount > 0 ? "" : "Discount Amount is required";
    tempErrors.activationDate = voucher.activationDate
      ? ""
      : "Activation Date is required";
    tempErrors.expiryDate = voucher.expiryDate ? "" : "Expiry Date is required";
    tempErrors.method = voucher.method ? "" : "Method is required";
    tempErrors.type = voucher.type ? "" : "Type is required";
    tempErrors.minimumBuyingQuantity =
      voucher.minimumBuyingQuantity >= 1
        ? ""
        : "Minimum Buying Quantity must be at least 1";
    tempErrors.minimumDistanceFromStore =
      voucher.minimumDistanceFromStore >= 0
        ? ""
        : "Minimum Distance From Store must be at least 0";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await addVoucher(voucher);
        toast.success("Voucher added successfully");
        setVoucher({
          code: "",
          name: "",
          description: "",
          image: "",
          discountAmount: 0,
          activationDate: "",
          expiryDate: "",
          method: "",
          type: "",
          shopVsBrandId: "",
          appliedCategoryIds: "",
          appliedProductIds: "",
          minimumBuyingQuantity: 1,
          minimumDistanceFromStore: 0,
        });
        setErrors({});
      } catch (err) {
        toast.error("Failed to add voucher");
      }
    } else {
      toast.warning("Please fill all required fields");
    }
  };

  return (
    <Box mb={4}>
      <Typography variant="h5" gutterBottom>
        Add Voucher
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ "& > :not(style)": { mb: 2 } }} // Adjust spacing between fields
      >
        <TextField
          label="Code"
          name="code"
          value={voucher.code}
          onChange={handleChange}
          fullWidth
          error={!!errors.code}
          helperText={errors.code}
        />
        <TextField
          label="Name"
          name="name"
          value={voucher.name}
          onChange={handleChange}
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Description"
          name="description"
          value={voucher.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Image"
          name="image"
          value={voucher.image}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Discount Amount"
          name="discountAmount"
          value={voucher.discountAmount}
          onChange={handleChange}
          type="number"
          fullWidth
          error={!!errors.discountAmount}
          helperText={errors.discountAmount}
        />
        <TextField
          label="Activation Date"
          name="activationDate"
          value={voucher.activationDate}
          onChange={handleChange}
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={!!errors.activationDate}
          helperText={errors.activationDate}
        />
        <TextField
          label="Expiry Date"
          name="expiryDate"
          value={voucher.expiryDate}
          onChange={handleChange}
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={!!errors.expiryDate}
          helperText={errors.expiryDate}
        />
        <TextField
          select
          label="Method"
          name="method"
          value={voucher.method}
          onChange={handleChange}
          fullWidth
          error={!!errors.method}
          helperText={errors.method}
        >
          {voucherMethods.map((method) => (
            <MenuItem key={method} value={method}>
              {method}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Type"
          name="type"
          value={voucher.type}
          onChange={handleChange}
          fullWidth
          error={!!errors.type}
          helperText={errors.type}
        >
          {voucherTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Shop or Brand ID"
          name="shopVsBrandId"
          value={voucher.shopVsBrandId}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Applied Category IDs (comma-separated)"
          name="appliedCategoryIds"
          value={voucher.appliedCategoryIds}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Applied Product IDs (comma-separated)"
          name="appliedProductIds"
          value={voucher.appliedProductIds}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Minimum Buying Quantity"
          name="minimumBuyingQuantity"
          value={voucher.minimumBuyingQuantity}
          onChange={handleChange}
          type="number"
          fullWidth
          error={!!errors.minimumBuyingQuantity}
          helperText={errors.minimumBuyingQuantity}
        />
        <TextField
          label="Minimum Distance From Store (km)"
          name="minimumDistanceFromStore"
          value={voucher.minimumDistanceFromStore}
          onChange={handleChange}
          type="number"
          fullWidth
          error={!!errors.minimumDistanceFromStore}
          helperText={errors.minimumDistanceFromStore}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Voucher
        </Button>
      </Box>
    </Box>
  );
};

export default AddVoucherForm;
