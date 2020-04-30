import React from "react";
import "./ShoppingListPageStyle.css";
import PropTypes from "prop-types";
import InlineSelectInput from "../common/InlineSelectInput";
import ShoppingProductWidget from "./ShoppingProductWidget";

const ShoppingSectionWidget = ({ editable, section, products }) => {
  return (
    <>
      <h4 className={"sectionTitle"}>{section}</h4>
      <table className={"listTable"}>
        <tbody>
          {products.map((product) => {
            if (editable) {
              return (
                <ShoppingProductWidget key={product.uid} product={product} />
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
};

export default ShoppingSectionWidget;
