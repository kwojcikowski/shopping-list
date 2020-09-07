import React from "react";
import "./ShoppingListPageStyle.css";
import PropTypes from "prop-types";
import ShoppingProductWidget from "./ShoppingProductWidget";
import * as cartActions from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const ShoppingSectionWidget = ({
  editable,
  section,
  cartItems,
  deleteProductFromCart,
}) => {
  const onProductDelete = (cartProduct) => {
    deleteProductFromCart(cartProduct)
      .then(() => {
        toast.success(`Produkt pomyślnie usunięty z listy.`);
      })
      .catch(() => {
        toast.error("Wystąpił błąd przy usuwaniu produktu z listy.");
      });
  };

  return (
    <>
      <h4 className={"sectionTitle"}>{section}</h4>
      <table className={"listTable"}>
        <tbody>
          {cartItems.map((cartItem) => {
            if (editable) {
              return (
                <ShoppingProductWidget
                  deleteProductFromCart={onProductDelete}
                  key={cartItem._links.self.href}
                  cartItem={cartItem}
                />
              );
            } else {
              return (
                <tr key={cartItem._links.self.href} className={"listRow"}>
                  <td className={"listColumn"}>{cartItem.product.name}</td>
                  <td className={"listColumn"}>
                    {cartItem.quantity + " "}
                    {cartItem.unit.abbreviation}
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
  cartItems: PropTypes.array.isRequired,
  editable: PropTypes.bool.isRequired,
  deleteProductFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  deleteProductFromCart: cartActions.deleteProductFromCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingSectionWidget);
