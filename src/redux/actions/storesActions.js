import * as types from "./actionTypes";
import * as storesApi from "../../api/storesApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

function loadSupportedStoresSuccess(supportedStores) {
  return { type: types.LOAD_STORES_SUCCESS, supportedStores };
}

function updateStoreOrderSuccess(store) {
  return { type: types.UPDATE_STORE_ORDER_SUCCESS, store };
}

function addSectionToOrderSuccess(store) {
  return { type: types.ADD_SECTION_TO_ORDER_SUCCESS, store };
}

function deleteSectionFromOrderSuccess(store) {
  return { type: types.DELETE_SECTION_FROM_ORDER_SUCCESS, store };
}

export function loadStores() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return storesApi
      .loadStores()
      .then((supportedStores) => {
        dispatch(loadSupportedStoresSuccess(supportedStores));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function addSectionToOrder(section, store) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return storesApi
      .addSectionToOrder(section, store)
      .then((response) => {
        dispatch(addSectionToOrderSuccess(response));
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
    return storesApi
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

export function deleteSectionFromOrder(store, section) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return storesApi
      .deleteSectionFromOrder(store, section)
      .then((store) => {
        dispatch(deleteSectionFromOrderSuccess(store));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
