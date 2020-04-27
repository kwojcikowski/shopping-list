import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as productApi from "../../api/productApi";

function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

function saveProductSuccess(product) {
  return { type: types.SAVE_PRODUCT_SUCCESS, product };
}

export function loadProducts() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return productApi
      .getProducts()
      .then((products) => {
        dispatch(loadProductsSuccess(products));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveProduct(product) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return productApi
      .saveProduct(product)
      .then((product) => {
        dispatch(saveProductSuccess(product));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
