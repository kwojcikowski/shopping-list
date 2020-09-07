import { combineReducers } from "redux";
import products from "./productReducer";
import apiCallsInProgress from "./apiStatusReducer";
import sections from "./sectionsReducer";
import cart from "./cartReducer";
import store from "./storeReducer";
import stores from "./storesReducer";
import storeSections from "./storeSectionsReducer";
import units from "./unitsReducer";

const rootReducer = combineReducers({
  products,
  sections,
  units,
  apiCallsInProgress,
  cart,
  store,
  stores,
  storeSections,
});

export default rootReducer;
