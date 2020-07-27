import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.AUTHENTICATE:
      return action.auth;
    default:
      return state;
  }
}
