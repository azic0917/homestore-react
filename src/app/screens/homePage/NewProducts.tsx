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
import Divider from "../../components/divider";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR **/
const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => ({
    newProducts,
  }),
);

export default function NewProducts() {
  const { newProducts } = useSelector(newProductsRetriever);

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
                    <Card variant="outlined" className={"card"}>
                      {/* Product Image + Sale Badge Wrapper */}
                      <Box sx={{ position: "relative" }}>
                        <Chip label="NEW" className="product-sale" />
                        <CardMedia
                          component="img"
                          height="220"
                          image={imagePath}
                          alt={product.productName}
                          className="card-media"
                        />
                      </Box>

                      {/* Details Section */}
                      <CardContent className="product-detail">
                        <Stack className="info">
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ minWidth: 0 }}
                          >
                            <Typography className={"title"}>
                              {product.productName}
                            </Typography>
                            <Divider width="2" height="18" bg="#E2D4EE" />
                            <Typography className={"price"}>
                              ₩{product.productPrice}
                            </Typography>
                          </Stack>

                          <Typography className={"views"}>
                            {product.productViews}
                            <VisibilityIcon
                              sx={{ fontSize: 18, marginLeft: "4px" }}
                            />
                          </Typography>
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
