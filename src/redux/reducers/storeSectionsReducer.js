import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function storeSectionsReducer(
  state = initialState.storeSections,
  action
) {
  switch (action.type) {
    case types.LOAD_STORE_SECTIONS_BY_STORE_URL_FRIENDLY_NAME_SUCCESS:
      return action.storeSections;
    default:
      return state;
  }
}
