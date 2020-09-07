import * as types from "./actionTypes";
import * as cartApi from "../../api/cartApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

function loadCartSuccess(cart) {
  return { type: types.LOAD_CART_SUCCESS, cart };
}

function addProductToCartSuccess(cartItem) {
  return { type: types.ADD_TO_CART_SUCCESS, cartItem };
}

function updateProductInCartLocallySuccess(cartItem) {
  return { type: types.UPDATE_PRODUCT_IN_CART_LOCALLY_SUCCESS, cartItem };
}

function updateCartSuccess(cart) {
  return { type: types.UPDATE_CART_SUCCESS, cart };
}

function deleteProductFromCartSuccess(cartItemLink) {
  return { type: types.DELETE_PRODUCT_FROM_CART_SUCCESS, cartItemLink };
}

export function loadCart() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return cartApi
      .getCart()
      .then((cart) => {
        dispatch(loadCartSuccess(cart));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function addProductToCart(cartItem) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return cartApi
      .addProductToCart(cartItem)
      .then((cartItem) => {
        dispatch(addProductToCartSuccess(cartItem));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function updateProductInCartLocally(cartItem) {
  return function (dispatch) {
    return dispatch(updateProductInCartLocallySuccess(cartItem));
  };
}

export function updateCart(cartItems) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return cartApi
      .updateCart(cartItems)
      .then((cartItems) => {
        dispatch(updateCartSuccess(cartItems));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteProductFromCart(cartItemLink) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return cartApi
      .deleteProductFromCart(cartItemLink)
      .then(() => {
        dispatch(deleteProductFromCartSuccess(cartItemLink));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
