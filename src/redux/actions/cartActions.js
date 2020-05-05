import * as types from "./actionTypes";
import * as cartApi from "../../api/cartApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

function loadCartSuccess(cart) {
  return { type: types.LOAD_CART_SUCCESS, cart };
}
function addProductToCartSuccess(cartEntry) {
  return { type: types.ADD_TO_CART_SUCCESS, cartEntry };
}

function updateProductInCartSuccess(cartEntry) {
  return { type: types.UPDATE_PRODUCT_IN_CART_SUCCESS, cartEntry };
}

function updateProductInCartLocallySuccess(cartEntry) {
  return { type: types.UPDATE_PRODUCT_IN_CART_LOCALLY_SUCCESS, cartEntry };
}

function updateCartSuccess(cart) {
  return { type: types.UPDATE_CART_SUCCESS, cart };
}

function deleteProductFromCartSuccess(cartEntry) {
  return { type: types.DELETE_PRODUCT_FROM_CART_SUCCESS, cartEntry };
}

export function loadCart() {
  return function (dispatch) {
    beginApiCall();
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

export function addProductToCart(cartEntry) {
  return function (dispatch) {
    beginApiCall();
    return cartApi
      .addProductToCart(cartEntry)
      .then((cartEntry) => {
        dispatch(addProductToCartSuccess(cartEntry[0]));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function updateProductInCart(cartEntry) {
  return function (dispatch) {
    beginApiCall();
    return cartApi
      .updateProductInCart(cartEntry)
      .then((cartEntry) => {
        dispatch(updateProductInCartSuccess(cartEntry));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function updateProductInCartLocally(cartEntry) {
  return function (dispatch) {
    return dispatch(updateProductInCartLocallySuccess(cartEntry));
  };
}

export function updateCart(cart) {
  return function (dispatch) {
    return cartApi
      .updateCart(cart)
      .then(() => {
        dispatch(updateCartSuccess(cart));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteProductFromCart(cartEntry) {
  return function (dispatch) {
    return cartApi
      .deleteProductFromCart(cartEntry)
      .then(() => {
        dispatch(deleteProductFromCartSuccess(cartEntry));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
