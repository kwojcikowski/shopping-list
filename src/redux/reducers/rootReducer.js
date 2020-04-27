import { combineReducers } from "redux";
import products from "./productReducer";
import apiCallsInProgress from "./apiStatusReducer";
import sections from "./sectionsReducer";
import cart from "./cartReducer";

const rootReducer = combineReducers({
  products,
  sections,
  apiCallsInProgress,
  cart,
});

export default rootReducer;
