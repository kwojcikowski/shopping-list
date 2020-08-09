import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function storeSectionsReducer(
  state = initialState.storeSections,
  action
) {
  switch (action.type) {
    case types.LOAD_STORE_SECTIONS_DETAILS_BY_STORE_SUCCESS:
      return action.storeSectionsDetailsByStore;
    default:
      return state;
  }
}
