import { handleError, handleResponse } from "./apiUtils";
const baseUrl = "http://localhost:4000/supported-stores";

export function loadSupportedStores() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
