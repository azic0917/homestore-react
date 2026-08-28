import React from "react";
import {
  Box,
  Container,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import Typography from "@mui/material/Typography"; // Switch to standard MUI Typo
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR **/
const popularProductsRetriever = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({ popularProducts }),
);

export default function PopularProducts() {
  const { popularProducts } = useSelector(popularProductsRetriever);

  return (
    <div className="popular-products-frame">
      {" "}
      {/* Renamed class */}
      <Container sx={{ py: 6 }}>
        <Stack className="popular-section">
          <Box className="category-title">Popular Products</Box>{" "}
          {/* Refined Title */}
          {popularProducts.length !== 0 ? (
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {" "}
              {/* Using Grid for cleaner layout */}
              {popularProducts.slice(0, 4).map((product: Product) => {
                // Assuming 4 cards fit better
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Grid item key={product._id} xs={12} sm={6} md={3}>
                    <Card className={"card"}>
                      {/* 1. Clear Image Area */}
                      <CardMedia
                        component="img"
                        height="240"
                        image={imagePath}
                        alt={product.productName}
                        className="card-media"
                      />

                      <CardContent className="card-body">
                        {/* 2. Product Name & Views */}
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          alignItems="center"
                          sx={{ mb: 1.5 }}
                        >
                          <Typography variant="h6" className="product-name">
                            {product.productName}
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            className="product-views"
                          >
                            <VisibilityIcon sx={{ fontSize: 18, mr: "4px" }} />
                            {product.productViews}
                          </Stack>
                        </Stack>

                        {/* 3. Description (Truncated) */}
                        <Stack
                          direction="row"
                          gap={1}
                          className="product-desc-container"
                        >
                          <DescriptionOutlinedIcon
                            sx={{ fontSize: 20, mt: "3px" }}
                          />
                          <Typography variant="body2" className="product-desc">
                            {product.productDesc}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Box className="no-data">Popular products are not available!</Box>
          )}
        </Stack>
      </Container>
    </div>
  );
}
