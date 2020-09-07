import { handleError, handleResponse } from "./apiUtils";
const baseUrl = "http://localhost:8080/storeSections";

export function loadStoreSectionsByStoreUrlFriendlyName(storeUrlFriendlyName) {
  return fetch(
    baseUrl +
      `/search/findByStore_UrlFriendlyNameOrderByPosition?storeUrlFriendlyName=${storeUrlFriendlyName}`
  )
    .then(handleResponse)
    .catch(handleError);
}
