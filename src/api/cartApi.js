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
      `/updateProduct?uid=${uid}&productId=${productId}&unit=${unit}&quantity=${quantity}`
  )
    .then(handleResponse)
    .catch(handleError);
}

export function updateCart(cart) {
  let cartString = JSON.stringify(cart.map(entry => {
    return {
      uid: entry.uid,
      productId: entry.productId,
      unit: entry.unit,
      quantity: entry.quantity
    }
  }))
  return fetch(
      baseUrl +
      `/update?cart=${cartString.toString()}`
  )
      .then(handleResponse)
      .catch(handleError);
}

export function deleteProductFromCart(cartEntry) {
  const { uid } = cartEntry
  return fetch(baseUrl + `/deleteProduct?uid=${uid}`).then(handleResponse).catch(handleError);
}
