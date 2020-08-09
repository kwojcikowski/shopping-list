import { handleError, handleResponse } from "./apiUtils";
import { prepareObjectForDatabase } from "../tools/smartUnits";

const baseUrl = "http://localhost:8080/cartItems";

export function getCart() {
  return fetch(baseUrl + "?projection=cartItemDetails")
    .then(handleResponse)
    .catch(handleError);
}

export function getCartEntry(link) {
  return fetch(link + "?projection=cartItemDetails")
    .then(handleResponse)
    .catch(handleError);
}

export function addProductToCart(cartEntry) {
  const preparedObject = prepareObjectForDatabase(cartEntry);
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(preparedObject),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateProductInCart(cartEntry) {
  const preparedObject = prepareObjectForDatabase(cartEntry);
  const linkParts = preparedObject.product._links.self.href.split("/");
  return fetch(cartEntry._links.self.href, {
    method: "PATCH", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      unit: preparedObject.unit,
      quantity: preparedObject.quantity,
      productId: linkParts[linkParts.length - 1].replace(/{.*}/, ""),
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
// Most likely won't be used due to updating single products. (more safe this way)
// export function updateCart(cart) {
//   return fetch(baseUrl + `/update`, {
//     method: "PUT", // POST for create, PUT to update when id already exists.
//     headers: { "content-type": "application/json" },
//     body: JSON.stringify(cart),
//   })
//     .then(handleResponse)
//     .catch(handleError);
// }

export function deleteProductFromCart(link) {
  return fetch(link, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch(handleError);
}
