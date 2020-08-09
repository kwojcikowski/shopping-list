import * as types from "./actionTypes";
import * as storeSectionsApi from "../../api/storeSectionsApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

// function loadStoreSectionsSuccess(storeSections) {
//   return { type: types.LOAD_STORE_SECTIONS_SUCCESS, storeSections };
// }
//
// function loadStoreSectionsDetailsSuccess(storeSectionsDetails) {
//   return {
//     type: types.LOAD_STORE_SECTIONS_DETAILS_SUCCESS,
//     storeSectionsDetails,
//   };
// }

function loadStoreSectionsDetailsByStoreSuccess(storeSectionsDetailsByStore) {
  return {
    type: types.LOAD_STORE_SECTIONS_DETAILS_BY_STORE_SUCCESS,
    storeSectionsDetailsByStore,
  };
}

// export function loadStoreSections() {
//   return function (dispatch) {
//     dispatch(beginApiCall());
//     return storeSectionsApi
//       .loadStoreSections()
//       .then((storeSections) => {
//         dispatch(loadStoreSectionsSuccess(storeSections));
//       })
//       .catch((error) => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// }
//
// export function loadStoreSectionsDetails() {
//   return function (dispatch) {
//     dispatch(beginApiCall());
//     return storeSectionsApi
//       .loadStoreSectionsDetails()
//       .then((storeSections) => {
//         dispatch(loadStoreSectionsDetailsSuccess(storeSections));
//       })
//       .catch((error) => {
//         dispatch(apiCallError(error));
//         throw error;
//       });
//   };
// }

export function loadStoreSectionsDetailsByStore(storeId) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return storeSectionsApi
      .loadStoreSectionsDetailsByStore(storeId)
      .then((storeSections) => {
        dispatch(loadStoreSectionsDetailsByStoreSuccess(storeSections));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
