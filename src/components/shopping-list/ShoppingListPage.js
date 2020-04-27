import React from "react";
import { Link } from "react-router-dom";
import

const ShoppingListPage = () => (
  <div className="jumbotron">
    <h1>Pluralsight Administration</h1>
    <p>React, Redux and React Router for ultra-responsive web apps</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </div>
);

const mapStateToProps = state => {
    return{
        cart: state.cart,
        products: state.products,
        section: state.section,
    }
}

const mapDispatchToProps = {

}

export default ShoppingListPage;
