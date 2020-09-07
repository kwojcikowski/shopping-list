import * as types from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as unitsApi from "../../api/unitsApi";

function loadUnitsSuccess(units) {
  return { type: types.LOAD_UNITS_SUCCESS, units };
}

export function loadUnits() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return unitsApi
      .getUnits()
      .then((units) => {
        dispatch(loadUnitsSuccess(units));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
