import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ShoppingSectionWidget from "./ShoppingSectionWidget";
import { groupBy, sortBy, find } from "underscore";
import "./ShoppingListPageStyle.css";
import * as cartActions from "../../redux/actions/cartActions";
import Select from "react-select";
import {
  alreadyExistsInCart,
  evaluateBestUnit,
  getAvailableUnits,
} from "../../tools/smartUnits";
import InlineTextInput from "../common/InlineTextInput";
import { toast } from "react-toastify";

const selectStyleName = {
  control: (provided) => ({
    ...provided,
    width: 300,
    margin: "10px",
  }),
};

const selectStyleUnit = {
  control: (provided) => ({
    ...provided,
    width: 80,
    margin: "10px",
  }),
};

const ShoppingListPage = ({
  cart,
  products,
  apiCallsInProgress,
  supportedStores,
  updateCart,
  addProductToCart,
  updateProductInCart,
}) => {
  const [editable, setEditable] = useState(false);
  const [sortedCart, setSortedCart] = useState({});
  const [sortingId, setSortingId] = useState(0);
  const [newCartProduct, setNewCartProduct] = useState({
    id: -1,
    name: "",
    default_unit: "",
    unit: "",
    quantity: "0",
    section: -1,
  });

  useEffect(() => {
    setSortedCart(sortByStoreOrder());
  }, [cart, supportedStores, sortingId]);

  const sortByStoreOrder = () => {
    if (supportedStores.length === 0 || cart.length === 0) return {};
    let newSortedCart = {};

    const groupedCart = groupBy(sortBy(cart, "productName"), "sectionName");
    const cartKeys = Object.keys(groupedCart);
    const selectedStore = find(
      supportedStores,
      (store) => store.id === sortingId
    );

    if (selectedStore === undefined) {
      return groupedCart;
    }
    const order = sortBy(selectedStore.order, "sectionOrder");

    for (let section of order) {
      if (cartKeys.indexOf(section.sectionName) !== -1) {
        newSortedCart[section.sectionName] = groupedCart[section.sectionName];
      }
    }
    return newSortedCart;
  };

  const onSelectChange = (event) => {
    setSortingId(parseInt(event.target.value));
  };

  const onNewProductIdChange = (selectedOption) => {
    setNewCartProduct({
      ...newCartProduct,
      ...selectedOption,
      unit: newCartProduct.unit
        ? newCartProduct.unit
        : selectedOption.default_unit,
    });
  };

  const onNewProductUnitChange = (selectedOption) => {
    const product = { ...newCartProduct, ...selectedOption };
    if (product.quantity !== 0 && product.unit !== "") {
      setNewCartProduct((prev) => ({
        ...prev,
        ...evaluateBestUnit(product),
      }));
    } else {
      setNewCartProduct({
        ...newCartProduct,
        ...selectedOption,
      });
    }
  };

  const onNewProductQuantityChange = (event) => {
    // eslint-disable-next-line no-useless-escape
    if (
      event.target.value.match("^[0-9]+[.,]?[0-9]*$") ||
      event.target.value === ""
    ) {
      setNewCartProduct({
        ...newCartProduct,
        quantity: event.target.value,
      });
    }
  };

  const onNewProductSubmit = (event) => {
    event.preventDefault();
    let error = false;
    let messages = [];
    if (newCartProduct.id === -1) {
      error = true;
      messages.push("Nie wybrano produktu");
    }
    if (newCartProduct.unit === "") {
      error = true;
      messages.push("Nie wybrano jednostki");
    }
    if (newCartProduct.quantity <= 0) {
      messages.push("Niepoprawna ilość");
    }
    if (error) {
      toast.error(
        <div>
          Nie można było dodać produktu:{" "}
          {messages.map((m) => (
            <p key={m}>
              <br />
              {m}
            </p>
          ))}
        </div>
      );
      return;
    }
    const toAdd = {
      productId: newCartProduct.id,
      unit: newCartProduct.unit,
      quantity: newCartProduct.quantity,
    };
    const exists = alreadyExistsInCart(toAdd, cart);
    if (exists != null) {
      const newEntry = evaluateBestUnit(exists, toAdd);
      updateProductInCart(newEntry)
        .then(
          toast.success(`Produkt ${newCartProduct.name} dodany do koszyka!`)
        )
        .catch(() =>
          toast.error("Dodawanie produktu do koszyka nie powiodło się.")
        );
    } else {
      addProductToCart(toAdd)
        .then(
          toast.success(`Produkt ${newCartProduct.name} dodany do koszyka!`)
        )
        .catch(() =>
          toast.error("Dodawanie produktu do koszyka nie powiodło się.")
        );
    }
  };

  const onFocusOut = () => {
    let quantity = newCartProduct.quantity.toString();
    if (quantity === "") {
      setNewCartProduct((prevValue) => ({ ...prevValue, quantity: 0 }));
      return;
    }
    // eslint-disable-next-line no-useless-escape
    if (quantity.match("/^[0-9]+[.,]$/")) {
      quantity = quantity.replace("[,.]", "");
    }
    quantity = parseFloat(quantity.replace(",", "."));
    if (newCartProduct.unit === "") {
      setNewCartProduct((prevValue) => ({ ...prevValue, quantity }));
    } else {
      const newProduct = evaluateBestUnit({
        ...newCartProduct,
        quantity,
      });
      if (JSON.stringify(newProduct) !== JSON.stringify(newCartProduct)) {
        setNewCartProduct((prevValue) => ({
          ...prevValue,
          ...newProduct,
          quantity: newProduct.quantity.toString(),
        }));
      }
    }
  };

  return (
    <div className="list">
      <h3 className={"listTitle"}>Twoja lista zakupów</h3>
      <div className="optionsDiv">
        <div className="sortingDiv">
          <p className="sortingLabel">Sortuj według</p>
          <select className="sortingSelect" onChange={onSelectChange}>
            <option key={0} value={0} />
            {supportedStores.map((store) => {
              return (
                <option key={store.id} value={store.id}>
                  {store.fullName}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={() => {
            setEditable(!editable);
            if (editable) {
              updateCart(cart);
            }
          }}
          className="btn btn-outline-primary editButton"
        >
          {editable ? "Zapisz" : "Edytuj listę zakupów"}
        </button>
      </div>
      {editable ? (
        <form onSubmit={onNewProductSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "25px 0",
            }}
          >
            <Select
              name="id"
              styles={selectStyleName}
              value={newCartProduct}
              onChange={onNewProductIdChange}
              getOptionLabel={(option) => `${option.name}`}
              getOptionValue={(option) => `${option.id}`}
              options={products}
            />
            <input
              style={{ margin: "10px", width: "50px" }}
              onChange={onNewProductQuantityChange}
              name={"quantity"}
              value={newCartProduct.quantity}
              type="text"
              onBlur={onFocusOut}
            />
            <Select
              name="unit"
              value={newCartProduct}
              styles={selectStyleUnit}
              onChange={onNewProductUnitChange}
              getOptionLabel={(option) => `${option.unit}`}
              getOptionValue={(option) => `${option.unit}`}
              options={getAvailableUnits().map((unit) => ({ unit }))}
            />
            <button type="submit" className="btn btn-outline-success">
              Dodaj do listy
            </button>
          </div>
        </form>
      ) : (
        <></>
      )}

      {apiCallsInProgress ? (
        <Spinner />
      ) : (
        Object.keys(sortedCart).map((section) => {
          return (
            <ShoppingSectionWidget
              key={section}
              section={section}
              products={sortedCart[section]}
              editable={editable}
            />
          );
        })
      )}
    </div>
  );
};

ShoppingListPage.propTypes = {
  cart: PropTypes.array.isRequired,
  apiCallsInProgress: PropTypes.bool.isRequired,
  supportedStores: PropTypes.array.isRequired,
  updateCart: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  updateProductInCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    apiCallsInProgress: state.apiCallsInProgress > 0,
    cart: state.cart,
    supportedStores: state.supportedStores,
    products: sortBy(state.products, "name"),
  };
};

const mapDispatchToProps = {
  updateCart: cartActions.updateCart,
  addProductToCart: cartActions.addProductToCart,
  updateProductInCart: cartActions.updateProductInCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListPage);
