import * as types from "./actionTypes";

export function authenticate(auth) {
  console.log(auth);
  return { type: types.AUTHENTICATE, auth };
}
