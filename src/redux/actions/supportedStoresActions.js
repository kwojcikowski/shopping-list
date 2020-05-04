import * as types from "./actionTypes";
import * as supportedStoresApi from "../../api/supportedStoresApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

function loadSupportedStoresSuccess(supportedStores) {
  return { type: types.LOAD_SUPPORTED_STORES_SUCCESS, supportedStores };
}

function updateStoreOrderSuccess(store) {
  return { type: types.UPDATE_STORE_ORDER_SUCCESS, store };
}

export function loadSupportedStores() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return supportedStoresApi
      .loadSupportedStores()
      .then((supportedStores) => {
        dispatch(loadSupportedStoresSuccess(supportedStores));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function updateStoreOrder(store) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return supportedStoresApi
      .updateStoreOrder(store)
      .then((store) => {
        dispatch(updateStoreOrderSuccess(store));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
