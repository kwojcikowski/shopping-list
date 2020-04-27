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
      .then(() => {
        dispatch(addProductToCartSuccess(cartEntry));
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
      .then(() => {
        dispatch(updateProductInCartSuccess(cartEntry));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
