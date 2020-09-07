import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:8080/sections?size=200";

export function getSections() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
