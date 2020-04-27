import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:4000/sections";

export function getSections() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
