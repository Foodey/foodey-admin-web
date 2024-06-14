import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  CardMedia,
} from "@mui/material";

const VoucherDetail = ({ voucher, open, onClose }) => {
  const defaultImage =
    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"; // Default image URL

  const handleImageError = (e) => {
    e.preventDefault();
    e.target.onerror = null;
    e.target.src = defaultImage;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Voucher Details</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Code:</strong> {voucher.code}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Name:</strong> {voucher.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Description:</strong> {voucher.description}
            </Typography>
          </Grid>
          {voucher.image && (
            <Grid item xs={12}>
              <CardMedia
                component="img"
                height="140"
                image={voucher.image}
                alt={voucher.name}
                onError={handleImageError} // Add onError handler
                loading="lazy"
              />
              {/* <img */}
              {/*   src={voucher.image} */}
              {/*   alt={voucher.name} */}
              {/*   style={{ width: "100%", height: "auto", borderRadius: "8px" }} */}
              {/* /> */}
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Type:</strong> {voucher.type}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Method:</strong> {voucher.method}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Activation Date:</strong>{" "}
              {new Date(voucher.activationDate).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Expiry Date:</strong>{" "}
              {new Date(voucher.expiryDate).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Discount Amount:</strong> {voucher.discountAmount}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Shop/Brand ID:</strong> {voucher.shopVsBrandId}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Applied Category IDs:</strong>{" "}
              {voucher.appliedCategoryIds?.join(", ")}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Applied Product IDs:</strong>{" "}
              {voucher.appliedProductIds?.join(", ")}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Minimum Buying Quantity:</strong>{" "}
              {voucher.minimumBuyingQuantity}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Minimum Distance From Store:</strong>{" "}
              {voucher.minimumDistanceFromStore} km
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              <strong>Quantity:</strong> {voucher.quantity}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

VoucherDetail.propTypes = {
  voucher: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VoucherDetail;
