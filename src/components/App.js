import React from "react";
import Header from "./common/Header";
import { Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ProductsPage from "./products/ProductsPage";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/products" component={ProductsPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
