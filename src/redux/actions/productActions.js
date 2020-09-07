import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as productApi from "../../api/productApi";

function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

function addProductSuccess(product) {
  return { type: types.ADD_PRODUCT_SUCCESS, product };
}

function deleteProductSuccess(product) {
  return { type: types.DELETE_PRODUCT_SUCCESS, product };
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

export function addProduct(product) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return productApi
      .addProduct(product)
      .then((product) => {
        dispatch(addProductSuccess(product));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteProduct(product) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return productApi
      .deleteProduct(product)
      .then((product) => {
        dispatch(deleteProductSuccess(product));
      })
      .catch((error) => {
        apiCallError(error);
        throw error;
      });
  };
}
