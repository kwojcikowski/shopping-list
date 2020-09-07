import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function productsReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;
    case types.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        _embedded: {
          ...state._embedded,
          products: [...state._embedded.products, action.product.content],
        },
      };
    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        _embedded: {
          ...state._embedded,
          products: state._embedded.products.filter(
            (p) =>
              p._links.self.href.replace("{?projection", "") ===
              action.product._links.self.href.replace("{?projection", "")
          ),
        },
      };
    default:
      return state;
  }
}
