import * as types from "./actionTypes";
import * as cartApi from "../../api/cartApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

function loadCartSuccess(cart) {
  return { type: types.LOAD_CART_SUCCESS, cart };
}

function loadCartEntrySuccess(entry) {
  return { type: types.LOAD_CART_ENTRY_SUCCESS, entry };
}

function addProductToCartSuccess(cartEntry) {
  return { type: types.ADD_TO_CART_SUCCESS, cartEntry };
}

function updateProductInCartSuccess(cartEntry) {
  return { type: types.UPDATE_PRODUCT_IN_CART_SUCCESS, cartEntry };
}

// function updateCartSuccess(cart) {
//   return { type: types.UPDATE_CART_SUCCESS, cart };
// }

function deleteProductFromCartSuccess(link) {
  return { type: types.DELETE_PRODUCT_FROM_CART_SUCCESS, link };
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

// TODO adding without fetching
export function addProductToCart(cartEntry) {
  return function (dispatch) {
    beginApiCall();
    return cartApi
      .addProductToCart(cartEntry)
      .then((cartEntry) => {
        dispatch(addProductToCartSuccess(cartEntry));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function addProductToCartAndFetch(cartEntry) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return cartApi
      .addProductToCart(cartEntry)
      .then((cartEntry) => {
        cartApi
          .getCartEntry(cartEntry._links.self.href)
          .then((cartEntry) => {
            dispatch(loadCartEntrySuccess(cartEntry));
          })
          .catch((error) => {
            dispatch(apiCallError(error));
            throw error;
          });
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function updateProductInCart(cartEntry) {
  return function (dispatch) {
    dispatch(beginApiCall());
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
//
// export function updateCart(cart) {
//   return function (dispatch) {
//     return cartApi
//       .updateCart(cart)
//       .then(() => {
//         dispatch(updateCartSuccess(cart));
//       })
//       .catch((error) => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// }

export function deleteProductFromCart(link) {
  return function (dispatch) {
    return cartApi
      .deleteProductFromCart(link)
      .then(() => {
        dispatch(deleteProductFromCartSuccess(link));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
