import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.KITCHEN,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS */

  const searchCollection = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  const handleCategoryToggle = (
    event: React.MouseEvent<HTMLElement>,
    newCollection: ProductCollection | null,
  ) => {
    if (newCollection !== null) {
      searchCollection(newCollection);
    }
  };

  return (
    <div className={"products"}>
      <Container maxWidth="lg">
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className={"top-text"}>
              <p>Products</p>
              <Stack className={"single-search-big-box"}>
                <input
                  type="text"
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Type here..."}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      searchProductHandler();
                    }
                  }}
                />
                <Button
                  type="button"
                  className={"single-button-search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    searchProductHandler();
                  }}
                  sx={{
                    backgroundColor: "#4A2E65 !important",
                    color: "#ffffff !important",
                    textTransform: "none",
                    fontWeight: 600,
                    minWidth: "auto",
                    height: "100%",
                    borderRadius: "0 20px 20px 0",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#36224a !important",
                      boxShadow: "none",
                    },
                  }}
                >
                  Search
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              {["createdAt", "productPrice", "productViews"].map(
                (orderType) => (
                  <Button
                    key={orderType}
                    variant={
                      productSearch.order === orderType
                        ? "contained"
                        : "outlined"
                    }
                    className={"order"}
                    onClick={() => searchOrderHandler(orderType)}
                    sx={{
                      backgroundColor:
                        productSearch.order === orderType
                          ? "#4A2E65"
                          : "transparent",
                      color:
                        productSearch.order === orderType
                          ? "#ffffff"
                          : "#4A2E65",
                      borderColor: "#4A2E65",
                      fontWeight: 600,
                      borderRadius: "20px",
                      padding: "6px 20px",
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor:
                          productSearch.order === orderType
                            ? "#36224a"
                            : "rgba(74, 46, 101, 0.08)",
                        borderColor: "#4A2E65",
                      },
                    }}
                  >
                    {orderType === "createdAt"
                      ? "New"
                      : orderType === "productPrice"
                        ? "Price"
                        : "Views"}
                  </Button>
                ),
              )}
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <ToggleButtonGroup
                value={productSearch.productCollection}
                exclusive
                onChange={handleCategoryToggle}
                aria-label="product categories"
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "8px",
                  backgroundColor: "#ffffff",
                  borderRadius: "24px",
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
                  border: "1px solid #e8e8e8",
                  "& .MuiToggleButton-root": {
                    border: "none",
                    borderRadius: "16px !important",
                    padding: "8px 22px",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    color: "#555555",
                    textTransform: "capitalize",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(74, 46, 101, 0.1)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#4A2E65 !important",
                      color: "#ffffff !important",
                      boxShadow: "0 2px 8px rgba(74, 46, 101, 0.25)",
                    },
                  },
                }}
              >
                <ToggleButton value={ProductCollection.KITCHEN}>
                  Kitchen
                </ToggleButton>
                <ToggleButton value={ProductCollection.CLEANING}>
                  Cleaning
                </ToggleButton>
                <ToggleButton value={ProductCollection.BATHROOM}>
                  Bathroom
                </ToggleButton>
                <ToggleButton value={ProductCollection.LIGHTING}>
                  Lighting
                </ToggleButton>
                <ToggleButton value={ProductCollection.STORAGE}>
                  Storage
                </ToggleButton>
                <ToggleButton value={ProductCollection.OTHER}>
                  Other
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <Button
                          className={"shop-btn"}
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            alt="Shopping Cart"
                            style={{ display: "flex", width: "20px" }}
                          />
                        </Button>
                        <Button className={"view-btn"}>
                          <Badge
                            badgeContent={product.productViews}
                            color="error"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "#888" : "#fff",
                                fontSize: "20px",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-price"}>
                          ₩{product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
              onChange={paginationHandler}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#4A2E65",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "rgba(74, 46, 101, 0.08)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "#4A2E65",
                    color: "#ffffff",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#36224a",
                    },
                  },
                },
              }}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
