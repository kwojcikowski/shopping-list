import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as productActions from "../redux/actions/productActions";
import { bindActionCreators } from "redux";
import Spinner from "./common/Spinner";

class ProductsPage extends React.Component {
  componentDidMount() {
    const { products, actions } = this.props;
    console.log(products);
    console.log(actions);

    if (products.length === 0) {
      actions.loadProducts().catch((e) => {
        alert("Loading products failed " + e);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Produkty</h2>
        {this.props.apiCallsInProgress ? (
          <Spinner />
        ) : (
          <>
            {this.props.products.map((product) => {
              return product.name;
            })}
          </>
        )}
      </>
    );
  }
}

ProductsPage.propTypes = {
  products: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  apiCallsInProgress: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  console.log(state);
  return {
    products: state.products,
    apiCallsInProgress: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
