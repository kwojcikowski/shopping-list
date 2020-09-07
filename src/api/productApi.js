import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:8080/products";

export function getProducts() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function addProduct(product) {
  return fetch(baseUrl, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProduct(product) {
  return fetch(baseUrl + "/delete", {
    method: "PUT", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}
