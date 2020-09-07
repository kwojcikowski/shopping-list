import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:8080/cartItems";

export function getCart() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function addProductToCart(cartItem) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cartItem),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateCart(cartItems) {
  return fetch(baseUrl, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cartItems),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProductFromCart(cartItemLink) {
  return fetch(cartItemLink, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
