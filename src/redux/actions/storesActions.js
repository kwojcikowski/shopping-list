import * as types from "./actionTypes";
import * as storesApi from "../../api/storesApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

function loadSupportedStoresSuccess(stores) {
  return { type: types.LOAD_STORES_SUCCESS, stores };
}

export function loadStores() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return storesApi
      .loadStores()
      .then((stores) => {
        dispatch(loadSupportedStoresSuccess(stores));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
