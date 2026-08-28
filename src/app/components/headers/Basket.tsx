import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0,
  );
  const shippingCost: number = itemsPrice < 100000 && itemsPrice > 0 ? 5000 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge
          badgeContent={cartItems.length}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#4A2E65",
              color: "#ffffff",
              fontWeight: 600,
            },
          }}
        >
          <img src={"/icons/shopping-cart.svg"} alt="shopping cart" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 6px 20px rgba(0,0,0,0.15))",
            mt: 1.5,
            borderRadius: "16px",
            border: "1px solid #e8e8e8",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            {cartItems.length === 0 ? (
              <div className={"empty-title"}>Cart is empty!</div>
            ) : (
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                width={"100%"}
                alignItems={"center"}
              >
                <div className={"cart-title"}>
                  Cart Products ({cartItems.length})
                </div>
                <DeleteForeverIcon
                  sx={{
                    cursor: "pointer",
                    color: "#ffffff",
                    "&:hover": { opacity: 0.8 },
                  }}
                  onClick={() => onDeleteAll()}
                />
              </Stack>
            )}
          </Box>

          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cartItems.length === 0 ? (
                <Box className={"empty-cart-body"}>
                  No items in your basket yet.
                </Box>
              ) : (
                cartItems.map((item: CartItem) => {
                  const imagePath = `${serverApi}/${item.image}`;
                  return (
                    <Box className={"basket-info-box"} key={item._id}>
                      <img
                        src={imagePath}
                        className={"product-img"}
                        alt={item.name}
                      />
                      <Box className={"product-details"}>
                        <span className={"product-name"}>{item.name}</span>
                        <p className={"product-price"}>
                          ₩{item.price} × {item.quantity}
                        </p>
                      </Box>
                      <div className="col-2">
                        <button
                          onClick={() => onRemove(item)}
                          className="remove"
                        >
                          -
                        </button>
                        <span className={"qty-value"}>{item.quantity}</span>
                        <button onClick={() => onAdd(item)} className="add">
                          +
                        </button>
                      </div>
                      <div className={"cancel-btn"}>
                        <CancelIcon
                          sx={{
                            color: "#999999",
                            fontSize: "20px",
                            "&:hover": { color: "#e53935" },
                          }}
                          onClick={() => onDelete(item)}
                        />
                      </div>
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
          {cartItems.length !== 0 && (
            <Box className={"basket-order"}>
              <Box className={"price-summary"}>
                <span className={"price-total"}>Total: ₩{totalPrice}</span>
                <span className={"price-breakdown"}>
                  (₩{itemsPrice} + ₩{shippingCost} shipping)
                </span>
              </Box>
              <Button
                onClick={proceedOrderHandler}
                startIcon={<ShoppingCartIcon />}
                variant={"contained"}
                sx={{
                  backgroundColor: "#4A2E65",
                  color: "#ffffff",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "20px",
                  padding: "6px 20px",
                  "&:hover": {
                    backgroundColor: "#36224a",
                  },
                }}
              >
                Order
              </Button>
            </Box>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
