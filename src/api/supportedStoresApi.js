import { handleError, handleResponse } from "./apiUtils";
const baseUrl = "http://localhost:4000/supported-stores";

export function loadSupportedStores() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function updateStoreOrder(store) {
  const orderString = JSON.stringify(
    store.order.map((entry) => {
      return {
        id: entry.id,
        sectionId: entry.sectionId,
        sectionOrder: entry.sectionOrder,
      };
    })
  );
  const url = baseUrl + `/updateOrder?store=${store.tableReference}`;
  return fetch(url, {
    method: "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: orderString,
  })
    .then(handleResponse)
    .catch(handleError);
}
