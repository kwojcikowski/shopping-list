import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function supportedStoresReducer(
  state = initialState.products,
  action
) {
  switch (action.type) {
    case types.LOAD_SUPPORTED_STORES_SUCCESS:
      return action.supportedStores;
    default:
      return state;
  }
}
