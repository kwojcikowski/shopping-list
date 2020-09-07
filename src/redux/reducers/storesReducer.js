import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function storesReducer(state = initialState.stores, action) {
  switch (action.type) {
    case types.LOAD_STORES_SUCCESS:
      return action.stores;
    default:
      return state;
  }
}
