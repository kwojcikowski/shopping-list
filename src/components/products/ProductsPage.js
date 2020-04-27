import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProductsList from "./ProductsList";

class ProductsPage extends React.Component {
  render() {
    return (
      <>
        {this.props.apiCallsInProgress ? (
          <Spinner />
        ) : (
          <>
            <ProductsList
              products={this.props.products}
              sections={this.props.sections}
            />
          </>
        )}
      </>
    );
  }
}

ProductsPage.propTypes = {
  products: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
  apiCallsInProgress: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    products: state.products,
    sections: state.sections,
    apiCallsInProgress: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
