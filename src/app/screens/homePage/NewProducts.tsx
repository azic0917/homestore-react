import React from "react";
import {
  Box,
  Container,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

interface NewProductsProps {
  chooseProductHandler: (id: string) => void;
}

/** REDUX SLICE & SELECTOR **/
const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => ({
    newProducts,
  }),
);

export default function NewProducts(props: NewProductsProps) {
  const { newProducts } = useSelector(newProductsRetriever);
  const { chooseProductHandler } = props;

  return (
    <div className={"new-products-frame"}>
      <Container sx={{ py: 6 }}>
        <Stack className={"main"}>
          <Box className={"category-title"}>New Arrivals</Box>

          {newProducts.length !== 0 ? (
            <Grid container spacing={3} sx={{ mt: 3, width: "100%" }}>
              {newProducts.slice(0, 4).map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Grid item key={product._id} xs={12} sm={6} md={3}>
                    <Card
                      className={"card"}
                      onClick={() => chooseProductHandler(product._id)}
                    >
                      {/* 1. Floating Badge */}
                      <Chip label="NEW" className="product-sale" />

                      {/* 2. Full Background Image */}
                      <CardMedia
                        component="img"
                        image={imagePath}
                        alt={product.productName}
                        className="card-media"
                      />

                      {/* 3. Glassmorphic Body Overlay */}
                      <CardContent className="card-body">
                        {/* Title & Price / Views */}
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                          alignItems="flex-start"
                          sx={{ mb: 1 }}
                        >
                          <Typography variant="h6" className="product-name">
                            {product.productName}
                          </Typography>
                          <Typography className="product-price">
                            ₩{product.productPrice}
                          </Typography>
                        </Stack>

                        {/* Description & Views Metadata */}
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          className="product-info-container"
                        >
                          <Stack
                            direction="row"
                            gap={0.8}
                            className="product-desc-container"
                          >
                            <DescriptionOutlinedIcon
                              sx={{ fontSize: 18, mt: "2px" }}
                            />
                            <Typography
                              variant="body2"
                              className="product-desc"
                            >
                              {product.productDesc
                                ? product.productDesc
                                : "No description available"}
                            </Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            alignItems="center"
                            className="product-views"
                          >
                            <VisibilityIcon sx={{ fontSize: 16, mr: "3px" }} />
                            {product.productViews}
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Box className="no-data">New products are not available!</Box>
          )}
        </Stack>
      </Container>
    </div>
  );
}
