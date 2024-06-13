// import React, { useState, useEffect } from "react";
// import AddCategoryForm from "../components/AddCategoryForm";
// import {
//   Container,
//   Box,
//   Typography,
//   CardContent,
//   CardMedia,
//   Card,
//   Grid,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import { getProductCategories, deleteProductCategory } from "../services/api";

// const ProductCagegoryPage = () => {
//   const [categories, setCategories] = useState([]);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [categoryToDelete, setCategoryToDelete] = useState(null);

//   useEffect(() => {
//     fetchCategories(page);
//   }, [page]);

//   const fetchCategories = async (slice) => {
//     try {
//       const data = await getProductCategories(slice); // Assuming page size of 10
//       setHasMore(!data.last);
//       setCategories((prevCategories) => [...prevCategories, ...data.content]);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleLoadMore = () => {
//     setPage((prev) => prev + 1);
//   };

//   const handleDeleteCategory = async () => {
//     try {
//       await deleteProductCategory(categoryToDelete.id);
//       setCategories((prev) =>
//         prev.filter((category) => category.id !== categoryToDelete.id),
//       );
//       handleClose();
//     } catch (error) {
//       console.error("Error deleting category:", error);
//     }
//   };

//   const handleClickOpen = (category) => {
//     setCategoryToDelete(category);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setCategoryToDelete(null);
//   };

//   return (
//     <Container component="main" maxWidth="lg">
//       <Box sx={{ marginTop: 8 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={8}>
//             <Typography
//               variant="h4"
//               component="div"
//               mb={2}
//               sx={{ fontWeight: "bold", color: "#1976d2" }}
//             >
//               Categories
//             </Typography>
//             <Grid container spacing={2}>
//               {categories.map((category, index) => (
//                 <Grid item xs={12} sm={6} key={index}>
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       height="140"
//                       image={category.image}
//                       alt={category.name}
//                     />
//                     <CardContent>
//                       <Grid
//                         container
//                         justifyContent="space-between"
//                         alignItems="center"
//                       >
//                         <Grid item>
//                           <Typography variant="h6">{category.name}</Typography>
//                           <Typography variant="body2" color="textSecondary">
//                             {category.description}
//                           </Typography>
//                         </Grid>
//                         <Grid item>
//                           <Button
//                             variant="outlined"
//                             color="error"
//                             onClick={() => handleClickOpen(category)}
//                           >
//                             Delete
//                           </Button>
//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//             {hasMore && (
//               <Box mt={2}>
//                 <Button variant="contained" onClick={handleLoadMore}>
//                   Load More
//                 </Button>
//               </Box>
//             )}
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <AddCategoryForm
//               onCategoryAdded={(newCategory) => {
//                 setCategories((prev) => [newCategory, ...prev]);
//               }}
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Delete Category"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Are you sure you want to delete this category? This action cannot be
//             undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeleteCategory} color="error" autoFocus>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default ProductCagegoryPage;
import React, { useState, useEffect } from "react";
import AddCategoryForm from "../components/AddCategoryForm";
import {
  Container,
  Box,
  Typography,
  CardContent,
  CardMedia,
  Card,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { getProductCategories, deleteProductCategory } from "../services/api";

const ProductCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const defaultImage =
    "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"; // Default image URL

  useEffect(() => {
    fetchCategories(page);
  }, [page]);

  const fetchCategories = async (slice) => {
    try {
      const data = await getProductCategories(slice); // Assuming page size of 10
      setHasMore(!data.last);
      setCategories((prevCategories) => [...prevCategories, ...data.content]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteProductCategory(categoryToDelete.id);
      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryToDelete.id),
      );
      handleClose();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleClickOpen = (category) => {
    setCategoryToDelete(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCategoryToDelete(null);
  };

  const handleImageError = (e) => {
    e.preventDefault();
    e.target.onerror = null;
    e.target.src = defaultImage;
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ marginTop: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              component="div"
              mb={2}
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              Categories
            </Typography>
            <Grid container spacing={2}>
              {categories.map((category, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={category.image}
                      alt={category.name}
                      onError={handleImageError} // Add onError handler
                      loading="lazy"
                    />
                    <CardContent>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Typography variant="h6">{category.name}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {category.description}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleClickOpen(category)}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {hasMore && (
              <Box mt={2}>
                <Button variant="contained" onClick={handleLoadMore}>
                  Load More
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <AddCategoryForm
              onCategoryAdded={(newCategory) => {
                setCategories((prev) => [newCategory, ...prev]);
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Category"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this category? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteCategory} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductCategoryPage;
