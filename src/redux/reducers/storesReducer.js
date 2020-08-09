import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function storesReducer(state = initialState.stores, action) {
  switch (action.type) {
    case types.LOAD_STORES_SUCCESS:
      return action.supportedStores;
    case types.UPDATE_STORE_ORDER_SUCCESS:
      return state.map((store) =>
        store.id === action.store.id ? action.store : store
      );
    case types.ADD_SECTION_TO_ORDER_SUCCESS:
      return state.map((store) =>
        store.id === action.store.id ? action.store : store
      );
    case types.DELETE_SECTION_FROM_ORDER_SUCCESS:
      return state.map((store) =>
        store.id === action.store.id ? action.store : store
      );
    default:
      return state;
  }
}
