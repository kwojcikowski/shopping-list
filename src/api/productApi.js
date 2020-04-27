import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:4000/products";

export function getProducts() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveProduct(product) {
  const { name, default_unit, section } = product;
  return fetch(
    baseUrl +
      `/add?name=${name.replace(
        " ",
        "_"
      )}&default_unit=${default_unit}&section=${section}`
  )
    .then(handleResponse)
    .catch(handleError);
}
