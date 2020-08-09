import { handleError, handleResponse } from "./apiUtils";
const baseUrl = "http://localhost:8080/stores";

export function loadStores() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function addSectionToOrder(section, store) {
  return fetch(baseUrl + `/insertOrder`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      section: section,
      store: store,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateStoreOrder(store) {
  const url = baseUrl + `/updateOrder`;
  return fetch(url, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(store),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteSectionFromOrder(store, section) {
  const url = baseUrl + `/deleteSection`;
  return fetch(url, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ store, section }),
  })
    .then(handleResponse)
    .catch(handleError);
}
