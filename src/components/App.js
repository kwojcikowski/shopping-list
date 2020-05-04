import React, { useEffect } from "react";
import Header from "./common/Header";
import { Route, Switch } from "react-router-dom";
import ShoppingListPage from "./shopping-list/ShoppingListPage";
import RecipesPage from "./RecipesPage";
import ProductsPage from "./products/ProductsPage";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as productActions from "../redux/actions/productActions";
import * as sectionsActions from "../redux/actions/sectionsAction";
import * as cartActions from "../redux/actions/cartActions";
import * as supportedStoresActions from "../redux/actions/supportedStoresActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import StoresPage from "./stores/StoresPage";
import ManageStore from "./stores/ManageStore";

function App({
  loadSections,
  loadProducts,
  loadCartProducts,
  loadSupportedStores,
}) {
  useEffect(() => {
    loadSections().catch((error) => {
      alert("Nie udało się załadować działów :( " + error);
    });
    loadProducts().catch((error) => {
      alert("Nie udało się załadować produktów :( " + error);
    });
    loadCartProducts().catch((error) => {
      alert("Nie udało się załadować koszyka " + error);
    });
    loadSupportedStores().catch((error) => {
      alert("Nie udało się załadować sklepów " + error);
    });
  }, []);
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={ShoppingListPage} />
        <Route path="/recipes" component={RecipesPage} />
        <Route path="/products" component={ProductsPage} />
        <Route path='/store/:slug' component={ManageStore} />
        <Route path="/stores" component={StoresPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

App.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  loadSections: PropTypes.func.isRequired,
  loadCartProducts: PropTypes.func.isRequired,
  loadSupportedStores: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  loadProducts: productActions.loadProducts,
  loadSections: sectionsActions.loadSections,
  loadCartProducts: cartActions.loadCart,
  loadSupportedStores: supportedStoresActions.loadSupportedStores,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
