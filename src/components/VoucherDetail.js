import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

const VoucherDetail = ({ voucher }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Voucher Details
      </Typography>
      <Typography>
        <strong>Code:</strong> {voucher.code}
      </Typography>
      <Typography>
        <strong>Name:</strong> {voucher.name}
      </Typography>
      <Typography>
        <strong>Description:</strong> {voucher.description}
      </Typography>
      <Typography>
        <strong>Image:</strong> {voucher.image}
      </Typography>
      <Typography>
        <strong>Type:</strong> {voucher.type}
      </Typography>
      <Typography>
        <strong>Method:</strong> {voucher.method}
      </Typography>
      <Typography>
        <strong>Activation Date:</strong>{" "}
        {new Date(voucher.activationDate).toLocaleString()}
      </Typography>
      <Typography>
        <strong>Expiry Date:</strong>{" "}
        {new Date(voucher.expiryDate).toLocaleString()}
      </Typography>
      <Typography>
        <strong>Discount Amount:</strong> {voucher.discountAmount}
      </Typography>
      <Typography>
        <strong>Shop/Brand ID:</strong> {voucher.shopVsBrandId}
      </Typography>
      <Typography>
        <strong>Applied Category IDs:</strong>{" "}
        {voucher.appliedCategoryIds?.join(", ")}
      </Typography>
      <Typography>
        <strong>Applied Product IDs:</strong>{" "}
        {voucher.appliedProductIds?.join(", ")}
      </Typography>
      <Typography>
        <strong>Minimum Buying Quantity:</strong>{" "}
        {voucher.minimumBuyingQuantity}
      </Typography>
      <Typography>
        <strong>Minimum Distance From Store:</strong>{" "}
        {voucher.minimumDistanceFromStore} km
      </Typography>
      <Typography>
        <strong>Quantity:</strong> {voucher.quantity}
      </Typography>
    </div>
  );
};

VoucherDetail.propTypes = {
  voucher: PropTypes.object.isRequired,
};

export default VoucherDetail;
