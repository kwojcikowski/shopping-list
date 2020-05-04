import React from "react";
import "./ShoppingListPageStyle.css";
import PropTypes from "prop-types";
import ShoppingProductWidget from "./ShoppingProductWidget";
import * as cartActions from "../../redux/actions/cartActions";
import {connect} from "react-redux";

const ShoppingSectionWidget = ({ editable, section, products, deleteProductFromCart }) => {

    const onProductDelete = (cartProduct) => {
        deleteProductFromCart(cartProduct)
    }

  return (
    <>
      <h4 className={"sectionTitle"}>{section}</h4>
      <table className={"listTable"}>
        <tbody>
          {products.map((product) => {
            if (editable) {
              return (
                <ShoppingProductWidget deleteProductFromCart={onProductDelete} key={product.uid} product={product} />
              );
            } else {
              return (
                <tr key={product.uid} className={"listRow"}>
                  <td className={"listColumn"}>{product.productName}</td>
                  <td className={"listColumn"}>
                    {product.quantity + " "}
                    {product.unit}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
};

ShoppingSectionWidget.propTypes = {
  section: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  editable: PropTypes.bool.isRequired,
    deleteProductFromCart: PropTypes.func.isRequired
};

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = {
    deleteProductFromCart: cartActions.deleteProductFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingSectionWidget);
