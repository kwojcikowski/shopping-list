import React, { useEffect, useState } from "react";
import InlineSelectInput from "../common/InlineSelectInput";
import { getAvailableUnits, evaluateBestUnit } from "../../tools/smartUnits";
import InlineTextInput from "../common/InlineTextInput";
import * as cartActions from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";

const ShoppingProductWidget = ({
  product,
  updateProductInCart,
  deleteProductFromCart,
}) => {
  const [cartProduct, setCartProduct] = useState({ ...product });

  useEffect(() => {
    setCartProduct((prevProduct) => ({
      ...prevProduct,
      ...product,
    }));
  }, [product]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    const newEntry = {
      ...cartProduct,
      [name]: name === "quantity" ? parseInt(value) : value,
    };
    setCartProduct(newEntry);
  };

  const onFocusOut = () => {
    if (JSON.stringify(cartProduct) !== JSON.stringify(product)) {
      const newProduct = evaluateBestUnit(cartProduct);
      setCartProduct(evaluateBestUnit(newProduct));
      updateProductInCart(newProduct);
    }
  };

  return (
    <tr key={product.uid} className={"listRow"}>
      <td className={"listColumn"}>{cartProduct.productName}</td>
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
          onClick={() => deleteProductFromCart(cartProduct)}
          className="btn btn-outline-danger"
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
};

ShoppingProductWidget.propTypes = {
  product: PropTypes.object.isRequired,
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
