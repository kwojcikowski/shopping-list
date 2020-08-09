import React, { useState } from "react";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";
import TextInput from "../common/TextInput";
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import * as productActions from "../../redux/actions/productActions";
import { toast } from "react-toastify";
import * as smartUnits from "../../tools/smartUnits";

const ProductWidget = ({
  cart,
  product,
  index,
  apiCallsInProgress,
  // addProductToCartAndFetch,
  updateProductInCart,
  deleteProduct,
}) => {
  const units = smartUnits.getAvailableUnits();
  const bgColor = index % 2 === 0 ? { backgroundColor: "#EEEEEE" } : {};

  const [cartEntry, setCartEntry] = useState({
    productId: product.id,
    unit: product.default_unit,
    quantity: "0",
  });

  const handleOnCartClick = () => {
    const exists = smartUnits.alreadyExistsInCart(cartEntry, cart);
    if (exists != null) {
      const newEntry = smartUnits.evaluateBestUnit(exists, cartEntry);
      updateProductInCart(newEntry)
        .then(() => {
          toast.success(`Produkt ${product.name} dodany do koszyka!`);
        })
        .catch(() => {
          toast.error(`Wystąpił błąd przy dodawaniu do koszyka.`);
        });
    } else if (!apiCallsInProgress) {
      // addProductToCart(cartEntry)
      //   .then(() => {
      //     toast.success(`Produkt ${product.name} dodany do koszyka!`);
      //   })
      //   .catch(() => {
      //     toast.error(`Wystąpił błąd przy dodawaniu do koszyka.`);
      //   });
    } else {
      toast.info("Wystąpił chwilowy problem. Spróbuj za chwilę.");
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setCartEntry((prevEntry) => ({
      ...prevEntry,
      [name]: value,
    }));
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

  return (
    <tr style={bgColor} key={product.id}>
      <td>{product.name}</td>
      <td>
        <SelectInput
          label={""}
          name={"unit"}
          value={cartEntry.unit}
          onChange={onChangeHandler}
          options={units.map((unit) => {
            return {
              value: unit,
              text: unit,
            };
          })}
        />
      </td>
      <td>
        <TextInput
          label={""}
          onChange={onChangeHandler}
          name={"quantity"}
          value={cartEntry.quantity}
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
  cart: PropTypes.array.isRequired,
  // addProductToCart: PropTypes.func.isRequired,
  updateProductInCart: PropTypes.func.isRequired,
  apiCallsInProgress: PropTypes.bool.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    apiCallsInProgress: state.apiCallsInProgress > 0,
  };
};

const mapDispatchToProps = {
  addProductToCartAndFetch: cartActions.addProductToCartAndFetch,
  updateProductInCart: cartActions.updateProductInCart,
  deleteProduct: productActions.deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductWidget);
