import React, { useEffect } from "react";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import NewProducts from "./NewProducts";
import PopularProducts from "./PopularProducts";
import Statistics from "./Statistics";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProducts, setPopularProducts, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { useHistory } from "react-router-dom";
import "../../../css/home.css";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularProducts, setNewProducts, setTopUsers } =
    actionDispatch(useDispatch());

  //  Define handler
  const history = useHistory();
  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        // productCollection:
        //   ProductCollection.KITCHEN || ProductCollection.CLEANING,
      })
      .then((data) => setPopularProducts(data))
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => setNewProducts(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularProducts chooseProductHandler={chooseProductHandler} />
      <NewProducts chooseProductHandler={chooseProductHandler} />
      <ActiveUsers />
      <Events />
    </div>
  );
}
