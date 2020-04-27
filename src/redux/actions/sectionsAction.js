import * as types from "./actionTypes";
import { apiCallError, beginApiCall } from "./apiStatusActions";
import * as sectionsApi from "../../api/sectionsApi";

function loadSectionsSuccess(sections) {
  return { type: types.LOAD_SECTIONS_SUCCESS, sections };
}

export function loadSections() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return sectionsApi
      .getSections()
      .then((sections) => {
        dispatch(loadSectionsSuccess(sections));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
