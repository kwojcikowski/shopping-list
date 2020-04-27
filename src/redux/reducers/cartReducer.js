import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case types.LOAD_CART_SUCCESS:
      return action.cart;
    case types.ADD_TO_CART_SUCCESS:
      return [
        ...state,
        {
          ...action.cartEntry,
          uid: parseInt(action.cartEntry.uid),
          productId: parseInt(action.cartEntry.productId, 10),
          quantity: parseFloat(action.cartEntry.quantity),
        },
      ];
    case types.UPDATE_PRODUCT_IN_CART_SUCCESS:
      return state.map((entry) =>
        entry.uid === action.cartEntry.uid ? action.cartEntry : entry
      );
    default:
      return state;
  }
}
