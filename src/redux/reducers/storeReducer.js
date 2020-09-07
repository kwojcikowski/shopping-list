import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function storeReducer(state = initialState.store, action) {
  switch (action.type) {
    case types.LOAD_STORE_BY_URL_FRIENDLY_NAME_SUCCESS:
      return action.store;
    default:
      return state;
  }
}
