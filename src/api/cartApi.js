import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:4000/cart";

export function getCart() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function addProductToCart(cartEntry) {
  return fetch(baseUrl + `/add`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cartEntry),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateProductInCart(cartEntry) {
  return fetch(baseUrl + `/updateProduct`, {
    method: "PUT", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cartEntry),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateCart(cart) {
  return fetch(baseUrl + `/update`, {
    method: "PUT", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cart),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProductFromCart(cartEntry) {
  return fetch(baseUrl + `/deleteProduct`, {
    method: "PUT", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(cartEntry),
  })
    .then(handleResponse)
    .catch(handleError);
}
