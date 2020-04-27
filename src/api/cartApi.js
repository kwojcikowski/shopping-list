import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:4000/cart";

export function getCart() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function addProductToCart(cartEntry) {
  const { productId, unit, quantity } = cartEntry;
  return fetch(
    baseUrl + `/add?productId=${productId}&unit=${unit}&quantity=${quantity}`
  )
    .then(handleResponse)
    .catch(handleError);
}

export function updateProductInCart(cartEntry) {
  const { uid, productId, unit, quantity } = cartEntry;
  return fetch(
    baseUrl +
      `/update?uid=${uid}&productId=${productId}&unit=${unit}&quantity=${quantity}`
  )
    .then(handleResponse)
    .catch(handleError);
}
