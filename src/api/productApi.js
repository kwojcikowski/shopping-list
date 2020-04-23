import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:4000/products";

export function getProducts() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
