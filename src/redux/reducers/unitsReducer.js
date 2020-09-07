import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function productsReducer(state = initialState.units, action) {
  switch (action.type) {
    case types.LOAD_UNITS_SUCCESS:
      return action.units;
    default:
      return state;
  }
}
