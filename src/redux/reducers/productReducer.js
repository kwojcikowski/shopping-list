import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function productsReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;
    case types.SAVE_PRODUCT_SUCCESS:
      return [
        ...state,
        {
          ...action.product,
          section: parseInt(action.product.section, 10),
          name: action.product.name.replace("_", " "),
        },
      ];
    default:
      return state;
  }
}
