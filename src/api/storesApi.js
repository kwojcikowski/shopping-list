import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:8080/stores";

export function loadStores() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function findStoreByUrlFriendlyName(urlFriendlyName) {
  return fetch(
    baseUrl + `/search/findByUrlFriendlyName?urlFriendlyName=${urlFriendlyName}`
  ).catch(handleError);
}
