import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function supportedStoresReducer(
  state = initialState.products,
  action
) {
  switch (action.type) {
    case types.LOAD_SUPPORTED_STORES_SUCCESS:
      return action.supportedStores;
    case types.UPDATE_STORE_ORDER_SUCCESS:
      return state.map((store) =>
        store.id === action.store.id ? action.store.id : store
      );
    default:
      return state;
  }
}
