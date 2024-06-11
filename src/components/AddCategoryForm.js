// src/components/AddCategoryForm.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { addProductCategory } from "../services/api";
import { HttpStatusCode } from "axios";

const AddCategoryForm = ({ onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [urlImage, setUrlImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const result = await addProductCategory({
        name,
        description,
        image: urlImage,
      });
      setSuccess("Category added successfully!");
      setName("");
      setDescription("");
      onCategoryAdded(result); // Call the callback to update categories
    } catch (error) {
      switch (error.response.data.code) {
        case HttpStatusCode.Conflict:
          setError("Category already exists");
          break;
        default:
          setError("An error occurred while adding the category");
      }
    } finally {
      setLoading(false);
    }
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
      <TextField
        margin="normal"
        fullWidth
        id="urlImage"
        label="Image URL"
        name="urlImage"
        autoComplete="urlImage"
        value={urlImage}
        onChange={(e) => setUrlImage(e.target.value)}
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
