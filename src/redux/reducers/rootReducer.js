import { combineReducers } from "redux";
import products from "./productReducer";
import apiCallsInProgress from "./apiStatusReducer";
import sections from "./sectionsReducer";
import cart from "./cartReducer";
import stores from "./storesReducer";
import storeSections from "./storeSectionsReducer";

const rootReducer = combineReducers({
  products,
  sections,
  apiCallsInProgress,
  cart,
  stores,
  storeSections,
});

export default rootReducer;
