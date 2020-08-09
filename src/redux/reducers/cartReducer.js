import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    // ! WARNING ! IN CASE OF DELETING A PRODUCT FROM DATABASE ALSO DELETE FROM CART.
    case types.DELETE_PRODUCT_SUCCESS:
      return state.filter((entry) => entry.productId !== action.product.id);
    case types.LOAD_CART_SUCCESS:
      return action.cart;
    case types.LOAD_CART_ENTRY_SUCCESS:
      return {
        ...state,
        _embedded: {
          ...state._embedded,
          cartItems: [...state._embedded.cartItems, action.entry],
        },
      };
    case types.UPDATE_CART_SUCCESS:
      return state;
    case types.ADD_TO_CART_SUCCESS:
      return state;
    case types.UPDATE_PRODUCT_IN_CART_SUCCESS:
      return {
        ...state,
        _embedded: {
          ...state._embedded,
          cartItems: state._embedded.cartItems.map((entry) =>
            entry._links.self.href === action.cartEntry._links.self.href
              ? {
                  ...entry,
                  quantity: parseFloat(action.cartEntry.quantity),
                }
              : entry
          ),
        },
      };
    case types.UPDATE_PRODUCT_IN_CART_LOCALLY_SUCCESS:
      return state.map((entry) =>
        entry.uid === parseInt(action.cartEntry.uid) ? action.cartEntry : entry
      );
    case types.DELETE_PRODUCT_FROM_CART_SUCCESS:
      return {
        ...state,
        _embedded: {
          ...state._embedded,
          cartItems: state._embedded.cartItems.filter(
            (entry) => entry._links.self.href !== action.link
          ),
        },
      };
    default:
      return state;
  }
}
