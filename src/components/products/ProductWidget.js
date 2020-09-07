import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import * as productActions from "../../redux/actions/productActions";
import { toast } from "react-toastify";
import Select from "react-select";
import { isEmpty } from "underscore";

const ProductWidget = ({
  product,
  index,
  unitsItems,
  addProductToCart,
  deleteProduct,
}) => {
  const bgColor = index % 2 === 0 ? { backgroundColor: "#EEEEEE" } : {};

  const [cartCandidate, setCartCandidate] = useState({
    product: product,
    unit: product.defaultUnit,
    quantity: 0,
  });


  const handleOnCartClick = () => {
    addProductToCart(cartCandidate)
      .then(() => {
        toast.success(
          `Produkt ${cartCandidate.product.name} dodany do koszyka!`
        );
      })
      .catch((e) => {
        throw e;
        // toast.error(`Wystąpił błąd przy dodawaniu do koszyka. ${e}`);
      });
  };

  const onProductDelete = () => {
    deleteProduct(product)
      .then(() => {
        toast.success(`Produkt ${product.name} pomyślnie usunięty.`);
      })
      .catch(() => {
        toast.error(`Usuwanie produktu ${product.name} nie powiodło się.`);
      });
  };

  const onUnitChange = (selectedOption) => {
    const product = { ...cartCandidate, unit: selectedOption };
    if (product.quantity !== 0 && product.unit.abbreviation !== "") {
      setCartCandidate((prev) => ({
        ...prev,
        ...product,
      }));
    } else {
      setCartCandidate({
        ...cartCandidate,
        unit: selectedOption,
      });
    }
  };

  const onCartCandidateQuantityChange = (event) => {
    // eslint-disable-next-line no-useless-escape
    if (
      event.target.value.match("^[0-9]+[.,]?[0-9]*$") ||
      event.target.value === ""
    ) {
      setCartCandidate({
        ...cartCandidate,
        quantity: event.target.value,
      });
    }
  };

  return (
    <tr style={bgColor} key={product.id}>
      <td>{product.name}</td>
      <td>
        <Select
          name="unit"
          value={cartCandidate.unit}
          onChange={onUnitChange}
          getOptionLabel={(option) => `${option.abbreviation}`}
          getOptionValue={(option) => `${option.abbreviation}`}
          options={unitsItems}
        />
      </td>
      <td>
        <input
          style={{ margin: "10px", width: "50px" }}
          onChange={onCartCandidateQuantityChange}
          name={"quantity"}
          value={cartCandidate.quantity}
          type="text"
          // onBlur={onFocusOut}
        />
      </td>
      <td>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={handleOnCartClick}
        >
          Dodaj do koszyka
        </button>
      </td>
      <td>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={onProductDelete}
        >
          Usuń produkt
        </button>
      </td>
    </tr>
  );
};

ProductWidget.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  unitsItems: PropTypes.array.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    unitsItems: isEmpty(state.units) ? [] : state.units._embedded.units,
  };
};

const mapDispatchToProps = {
  addProductToCart: cartActions.addProductToCart,
  deleteProduct: productActions.deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductWidget);
