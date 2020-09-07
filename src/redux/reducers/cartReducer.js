import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import {isEmpty} from "underscore";

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    // ! WARNING ! IN CASE OF DELETING A PRODUCT FROM DATABASE ALSO DELETE FROM CART.
    case types.DELETE_PRODUCT_SUCCESS:
      return state.filter((entry) => entry.productId !== action.product.id);
    case types.LOAD_CART_SUCCESS:
      return action.cart;
    case types.UPDATE_CART_SUCCESS:
      return {
        ...state,
        _embedded: {
          ...state._embedded,
          cartItems: state._embedded.cartItems,
        },
      };
    case types.ADD_TO_CART_SUCCESS:
      return isEmpty(state) ? {} :
      {
        ...state,
        _embedded: {
          ...state._embedded,
          cartItems: state._embedded.cartItems.find(
            (cartItem) =>
              cartItem._links.self.href ===
              action.cartItem.content._links.self.href
          )
            ? state._embedded.cartItems.map((cartItem) =>
                cartItem._links.self.href ===
                action.cartItem.content._links.self.href
                  ? action.cartItem.content
                  : cartItem
              )
            : [...state._embedded.cartItems, action.cartItem.content],
        },
      }
    case types.UPDATE_PRODUCT_IN_CART_LOCALLY_SUCCESS:
      return {
        ...state,
        _embedded: {
          ...state._embedded,
          cartItems: state._embedded.cartItems.map((cartItem) =>
            cartItem._links.self.href === action.cartItem._links.self.href
              ? action.cartItem
              : cartItem
          ),
        },
      };
    case types.DELETE_PRODUCT_FROM_CART_SUCCESS:
      return {
        ...state,
        _embedded: {
          ...state._embedded,
          cartItems: state._embedded.cartItems.filter(
            (cartItem) => cartItem._links.self.href !== action.cartItemLink
          ),
        },
      };
    default:
      return state;
  }
}
