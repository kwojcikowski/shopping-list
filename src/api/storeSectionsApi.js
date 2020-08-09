import { handleError, handleResponse } from "./apiUtils";
const baseUrl = "http://localhost:8080/storeSections";

// export function loadStoreSections() {
//   return fetch(baseUrl).then(handleResponse).catch(handleError);
// }
//
// export function loadStoreSectionsDetails() {
//   return fetch(baseUrl + "?projection=StoreSectionDetails")
//     .then(handleResponse)
//     .catch(handleError);
// }

export function loadStoreSectionsDetailsByStore(store) {
  return fetch(
    baseUrl +
      `/search/findAllByStore?store=${store}&projection=storeSectionDetails`
  )
    .then(handleResponse)
    .catch(handleError);
}

// TODO add and update
