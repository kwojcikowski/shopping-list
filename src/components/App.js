import React, { Component } from "react";
import Header from "./common/Header";
import { Redirect, Route, Switch } from "react-router-dom";
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
import * as authActions from "../redux/actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import StoresPage from "./stores/StoresPage";
import ManageStore from "./stores/ManageStore";
import Profile from "./profile/Profile";
import Callback from "./profile/Callback";
import Auth from "../auth/Auth";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  componentDidMount() {
    this.props.loadSections().catch((error) => {
      alert("Nie udało się załadować działów :( " + error);
    });
    this.props.loadProducts().catch((error) => {
      alert("Nie udało się załadować produktów :( " + error);
    });
    this.props.loadCartProducts().catch((error) => {
      alert("Nie udało się załadować koszyka " + error);
    });
    this.props.loadSupportedStores().catch((error) => {
      alert("Nie udało się załadować sklepów " + error);
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={(auth) => <ShoppingListPage auth={auth} />}
          />
          <Route path="/recipes" component={RecipesPage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/store/:slug" component={ManageStore} />
          <Route path="/stores" component={StoresPage} />
          {/*<Route*/}
          {/*  path="/profile"*/}
          {/*  render={(props) =>*/}
          {/*    this.auth.isAuthenticated() ? (*/}
          {/*      <Profile auth={this.auth} {...props} />*/}
          {/*    ) : (*/}
          {/*      <Redirect to="/" />*/}
          {/*    )*/}
          {/*  }*/}
          {/*/>*/}
          <Route
            path="/profile"
            render={(props) => <Profile auth={this.auth} {...props} />}
          />
          <Route
            path="/callback"
            render={(props) => <Callback auth={this.auth} {...props} />}
          />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer />
      </div>
    );
  }
}

App.propTypes = {
  loadProducts: PropTypes.func.isRequired,
  loadSections: PropTypes.func.isRequired,
  loadCartProducts: PropTypes.func.isRequired,
  loadSupportedStores: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  loadProducts: productActions.loadProducts,
  loadSections: sectionsActions.loadSections,
  loadCartProducts: cartActions.loadCart,
  loadSupportedStores: supportedStoresActions.loadSupportedStores,
  authenticate: authActions.authenticate,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
