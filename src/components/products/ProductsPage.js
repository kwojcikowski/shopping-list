import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProductsList from "./ProductsList";
import { isEmpty } from "underscore";
import * as sectionsActions from "../../redux/actions/sectionsAction";
import * as productsActions from "../../redux/actions/productActions";
import * as unitActions from "../../redux/actions/unitsActions";
import AddProductWidget from "./product-form/AddProductWidget";

class ProductsPage extends React.Component {
  componentDidMount() {
    this.props.loadSections();
    this.props.loadProducts();
    this.props.loadUnits();
  }

  render() {
    return (
      <>
        <AddProductWidget />
        {this.props.apiCallsInProgress ? (
          <Spinner />
        ) : (
          <>
            <ProductsList
              productsItems={this.props.productsItems}
              sectionsItems={this.props.sectionsItems}
            />
          </>
        )}
      </>
    );
  }
}

ProductsPage.propTypes = {
  productsItems: PropTypes.array.isRequired,
  sectionsItems: PropTypes.array.isRequired,
  apiCallsInProgress: PropTypes.bool.isRequired,

  loadSections: PropTypes.func.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadUnits: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    apiCallsInProgress: state.apiCallsInProgress > 0,
    productsItems: isEmpty(state.products)
      ? []
      : state.products._embedded.products,
    sectionsItems: isEmpty(state.sections)
      ? []
      : state.sections._embedded.sections,
  };
};

const mapDispatchToProps = {
  loadSections: sectionsActions.loadSections,
  loadProducts: productsActions.loadProducts,
  loadUnits: unitActions.loadUnits,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
