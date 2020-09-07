import * as types from "./actionTypes";
import * as storeSectionsApi from "../../api/storeSectionsApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

function loadStoreSectionsByStoreUrlFriendlyNameSuccess(storeSections) {
  return {
    type: types.LOAD_STORE_SECTIONS_BY_STORE_URL_FRIENDLY_NAME_SUCCESS,
    storeSections,
  };
}

export function loadStoreSectionsByStoreUrlFriendlyName(storeUrlFriendlyName) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return storeSectionsApi
      .loadStoreSectionsByStoreUrlFriendlyName(storeUrlFriendlyName)
      .then((storeSections) => {
        dispatch(loadStoreSectionsByStoreUrlFriendlyNameSuccess(storeSections));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
