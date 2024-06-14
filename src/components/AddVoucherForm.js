import React, { useState } from "react";
import { addVoucher } from "../services/api";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  CircularProgress,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { HttpStatusCode } from "axios";
import cldUpload from "../services/cloudinary";

const voucherMethods = ["PERCENTAGE", "SPECIAL_AMOUNT"];
const voucherTypes = ["PRODUCT", "CATEGORY"];

const AddVoucherForm = () => {
  const [voucher, setVoucher] = useState({
    code: "",
    name: "",
    description: "",
    image: null,
    discountAmount: 0,
    activationDate: "",
    expiryDate: "",
    method: voucherMethods[0],
    type: voucherTypes[0],
    shopVsBrandId: "",
    appliedCategoryIds: "",
    appliedProductIds: "",
    minimumBuyingQuantity: 1,
    minimumDistanceFromStore: 5,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setVoucher({ ...voucher, image: e.target.files[0] });
    } else {
      setVoucher({ ...voucher, [e.target.name]: e.target.value });
    }
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = voucher.name ? "" : "Name is required";
    tempErrors.discountAmount =
      voucher.discountAmount > 0 ? "" : "Discount Amount is required";
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
  const cleanVoucher = (voucher) => {
    const cleanedVoucher = { ...voucher };
    Object.keys(cleanedVoucher).forEach((key) => {
      if (cleanedVoucher[key] === "") {
        cleanedVoucher[key] = null;
      }
    });
    if (cleanedVoucher.appliedProductIds) {
      cleanedVoucher.appliedProductIds = cleanedVoucher.appliedProductIds
        .split(",")
        .map((id) => id.trim());
    }
    if (cleanedVoucher.appliedCategoryIds) {
      cleanedVoucher.appliedCategoryIds = cleanedVoucher.appliedCategoryIds
        .split(",")
        .map((id) => id.trim());
    }
    return cleanedVoucher;
  };

  const handleUploadImage = async (file, params) => {
    try {
      const response = await cldUpload(file, params);
      return response.data.secure_url;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const cleanedVoucher = cleanVoucher(voucher);
        const newVoucher = await addVoucher(cleanedVoucher);

        await handleUploadImage(
          voucher.image,
          newVoucher.imageApiUploadOptions,
        );

        toast.success("Voucher added successfully");
        setVoucher({
          code: "",
          name: "",
          description: "",
          image: null,
          discountAmount: 0,
          activationDate: "",
          expiryDate: "",
          method: voucherMethods[0],
          type: voucherTypes[0],
          shopVsBrandId: "",
          appliedCategoryIds: "",
          appliedProductIds: "",
          minimumBuyingQuantity: 1,
          minimumDistanceFromStore: 5,
        });
        setErrors({});
      } catch (err) {
        if (err.response.data.status === HttpStatusCode.Conflict)
          toast.error("Voucher code already exists");
        else {
          toast.error("Failed to add voucher");
        }
      } finally {
        setLoading(false);
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
        sx={{ "& > :not(style)": { mb: 2 } }}
      >
        <TextField
          label="Code"
          name="code"
          value={voucher.code}
          onChange={handleChange}
          fullWidth
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
        <InputLabel htmlFor="imageInput">Image</InputLabel>
        <ImageInputBox>
          <input
            id="imageInput"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <label htmlFor="imageInput">
            {voucher.image ? (
              <Typography>{voucher.image.name}</Typography>
            ) : (
              <Typography>Select Image...</Typography>
            )}
          </label>
        </ImageInputBox>
        {errors.image && (
          <Typography variant="caption" color="error">
            {errors.image}
          </Typography>
        )}
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
        />
        <TextField
          label="Expiry Date"
          name="expiryDate"
          value={voucher.expiryDate}
          onChange={handleChange}
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Add Voucher"}
        </Button>
      </Box>
    </Box>
  );
};

const ImageInputBox = styled(Box)`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: center;

  label {
    cursor: pointer;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 36px;
  }
`;

export default AddVoucherForm;
