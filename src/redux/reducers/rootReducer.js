import { combineReducers } from "redux";
import products from "./productReducer";
import apiCallsInProgress from "./apiStatusReducer";
import sections from "./sectionsReducer";
import cart from "./cartReducer";
import supportedStores from "./supportedStoresReducer";
import auth from "./authReducer";

const rootReducer = combineReducers({
  products,
  sections,
  apiCallsInProgress,
  cart,
  supportedStores,
  auth,
});

export default rootReducer;
