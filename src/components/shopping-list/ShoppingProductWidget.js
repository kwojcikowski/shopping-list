import React, { useEffect, useState } from "react";
import * as cartActions from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";
import { isEmpty, isMatch } from "underscore";
import Select from "react-select";

const selectStyleUnit = {
  control: (provided) => ({
    ...provided,
    width: 80,
    margin: "10px",
  }),
};

const ShoppingProductWidget = ({
  cartItem,
  unitsItems,
  updateProductInCartLocally,
  deleteProductFromCart,
}) => {
  const [cartProduct, setCartProduct] = useState(cartItem);

  useEffect(() => {
    setCartProduct((prevProduct) => {
      return {
        ...prevProduct,
        ...cartItem,
      };
    });
  }, [cartItem]);

  const onUnitChange = (selectedOption) => {
    setCartProduct({
      ...cartProduct,
      unit: selectedOption,
    });
  };

  const onQuantityChange = (event) => {
    // eslint-disable-next-line no-useless-escape
    if (
      event.target.value.match("^[0-9]+[.,]?[0-9]*$") ||
      event.target.value === ""
    ) {
      setCartProduct({
        ...cartProduct,
        quantity: parseFloat(event.target.value),
      });
    }
  };

  const onFocusOut = () => {
    if (!isMatch(cartProduct, cartItem)) {
      setCartProduct(cartProduct);
      updateProductInCartLocally(cartProduct);
    }
  };

  return (
    <tr key={cartProduct.product._links.self.href} className={"listRow"}>
      <td className={"listColumn"}>{cartProduct.product.name}</td>
      <td>
        <input
          style={{ margin: "10px", width: "50px" }}
          onChange={onQuantityChange}
          name={"quantity"}
          value={cartProduct.quantity}
          type="text"
          onBlur={onFocusOut}
        />
      </td>
      <td>
        <Select
          name="unit"
          style={selectStyleUnit}
          value={cartProduct.unit}
          onChange={onUnitChange}
          defaultOption={cartProduct.unit.abbreviation}
          getOptionLabel={(option) => `${option.abbreviation}`}
          getOptionValue={(option) => `${option.abbreviation}`}
          options={unitsItems}
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
  unitsItems: PropTypes.array.isRequired,
  updateProductInCartLocally: PropTypes.func.isRequired,
  deleteProductFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    unitsItems: isEmpty(state.units) ? [] : state.units._embedded.units,
  };
};

const mapDispatchToProps = {
  updateProductInCartLocally: cartActions.updateProductInCartLocally,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingProductWidget);
