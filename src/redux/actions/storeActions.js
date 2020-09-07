import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as storesApi from "../../api/storesApi";
import * as types from "./actionTypes";

function loadStoreByUrlFriendlyNameSuccess(store) {
  return { type: types.LOAD_STORE_BY_URL_FRIENDLY_NAME_SUCCESS, store };
}

export function loadStoreByUrlFriendlyName(urlFriendlyName) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return storesApi
      .findStoreByUrlFriendlyName(urlFriendlyName)
      .then((store) => dispatch(loadStoreByUrlFriendlyNameSuccess(store)))
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
