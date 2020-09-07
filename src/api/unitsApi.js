import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "http://localhost:8080/units";

export function getUnits() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
