import React from "react";
import {Route, Switch} from "react-router-dom";
import ShoppingListPage from "./shopping-list/ShoppingListPage";
import RecipesPage from "./RecipesPage";
import ProductsPage from "./products/ProductsPage";
import PageNotFound from "./PageNotFound";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoresPage from "./stores/StoresPage";
import ManageStore from "./stores/ManageStore";
import Header from "./common/Header";

function App() {
    return (
        <div>
            <Header/>
            <div style={{maxWidth: "1200px", margin: "auto"}}>
                <Switch>
                    <Route exact path="/" component={ShoppingListPage}/>
                    <Route path="/recipes" component={RecipesPage}/>
                    <Route path="/products" component={ProductsPage}/>
                    <Route path="/stores/:slug" component={ManageStore}/>
                    <Route path="/stores" component={StoresPage}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default App;
