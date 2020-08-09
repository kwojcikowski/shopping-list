import React, { useEffect, useState } from "react";
import InlineSelectInput from "../common/InlineSelectInput";
import { getAvailableUnits, evaluateBestUnit } from "../../tools/smartUnits";
import InlineTextInput from "../common/InlineTextInput";
import * as cartActions from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";

const ShoppingProductWidget = ({
  cartItem,
  updateProductInCart,
  deleteProductFromCart,
}) => {
  const [cartProduct, setCartProduct] = useState(evaluateBestUnit(cartItem));

  useEffect(() => {
    setCartProduct((prevProduct) =>
      evaluateBestUnit({
        ...prevProduct,
        ...cartItem,
      })
    );
  }, [cartItem]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    const newEntry = {
      ...cartProduct,
      [name]: name === "quantity" ? parseInt(value) : value,
    };
    setCartProduct(newEntry);
  };

  const onFocusOut = () => {
    if (JSON.stringify(cartProduct) !== JSON.stringify(cartItem)) {
      const newProduct = evaluateBestUnit(cartProduct);
      setCartProduct(evaluateBestUnit(newProduct));
      updateProductInCart(newProduct);
    }
  };

  return (
    <tr key={cartProduct.product._links.self.href} className={"listRow"}>
      <td className={"listColumn"}>{cartProduct.product.name}</td>
      <td>
        <InlineTextInput
          onChange={onChangeHandler}
          name={"quantity"}
          value={cartProduct.quantity}
          onFocusOut={onFocusOut}
        />
      </td>
      <td>
        <InlineSelectInput
          name={"unit"}
          onChange={onChangeHandler}
          value={cartProduct.unit}
          defaultOption={cartProduct.unit}
          options={getAvailableUnits()}
          onBlur={onFocusOut}
        />
      </td>
      <td>
        <button
          onClick={() => deleteProductFromCart(cartItem._links.self.href)}
          className="btn btn-outline-danger"
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
};

ShoppingProductWidget.propTypes = {
  cartItem: PropTypes.object.isRequired,
  updateProductInCart: PropTypes.func.isRequired,
  deleteProductFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  updateProductInCart: cartActions.updateProductInCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingProductWidget);
