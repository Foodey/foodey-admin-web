import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  InputLabel,
} from "@mui/material";
import { addProductCategory } from "../services/api";
import cldUpload from "../services/cloudinary";

const AddCategoryForm = ({ onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [urlImage, setUrlImage] = useState(null); // Changed to store file
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleUploadImage = async (file, params) => {
    try {
      const response = await cldUpload(urlImage, params);
      return response.data.secure_url;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const newProductCategory = await addProductCategory({
        name,
        description,
      });

      if (urlImage) {
        await handleUploadImage(
          urlImage,
          newProductCategory.cldImageUploadApiOptions,
        );
      }

      setSuccess("Category added successfully!");
      setName("");
      setDescription("");
      setUrlImage(null); // Clear the file input
      onCategoryAdded(newProductCategory); // Call the callback to update categories
    } catch (error) {
      setError(error.message || "An error occurred while adding the category");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setUrlImage(e.target.files[0]);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        Add New Category
      </Typography>
      {success && (
        <Typography color="success" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Category Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        id="description"
        label="Category Description"
        name="description"
        autoComplete="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <InputLabel htmlFor="urlImage" style={{ marginTop: "16px" }}>
        Image URL
      </InputLabel>
      <input
        id="urlImage"
        name="urlImage"
        type="file"
        accept="image/*"
        style={{ display: "block", marginTop: "8px", marginBottom: "16px" }}
        onChange={handleImageChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Add Category"}
      </Button>
    </Box>
  );
};

export default AddCategoryForm;
