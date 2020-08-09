import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ShoppingSectionWidget from "./ShoppingSectionWidget";
import { groupBy, sortBy, isEmpty } from "underscore";
import "./ShoppingListPageStyle.css";
import * as productsActions from "../../redux/actions/productActions";
import * as sectionsActions from "../../redux/actions/sectionsAction";
import * as storesActions from "../../redux/actions/storesActions";
import * as cartActions from "../../redux/actions/cartActions";
import * as storeSectionsActions from "../../redux/actions/storeSectionsActions";
import Select from "react-select";
import {
  alreadyExistsInCart,
  evaluateBestUnit,
  getAvailableUnits,
} from "../../tools/smartUnits";
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
  cartItems,
  productsItems,
  storesItems,
  sectionsItems,
  storeSectionsItems,
  apiCallsInProgress,
  addProductToCartAndFetch,
  updateProductInCart,
  loadSections,
  loadProducts,
  loadCartProducts,
  loadStores,
  loadStoreSectionsDetailsByStore,
}) => {
  const [editable, setEditable] = useState(false);
  const [sortedCartItems, setSortedCartItems] = useState({});
  const [sortingStore, setSortingStore] = useState(0);
  const [candidateProduct, setCandidateProduct] = useState({
    product: "",
    name: "",
    unit: "",
    quantity: 0,
  });

  // On component mount load dependencies
  useEffect(() => {
    try {
      loadSections();
      loadProducts();
      loadStores();
      loadCartProducts();
    } catch (error) {
      alert("Wystąpił problem z połączeniem.");
    }
  }, []);

  // This will detect the change of sorting store
  useEffect(() => {
    setSortedCartItems(sortByStoreOrder());
  }, [sortingStore, cartItems]);

  // Sort cart items in order of selected store
  const sortByStoreOrder = () => {
    if (cartItems.length === 0 || storesItems.length === 0) return {};
    let newSortedCart = {};

    const groupedCart = groupBy(
      sortBy(cartItems, "_embedded.product.name"),
      "sectionId"
    );
    if (sortingStore === 0) return groupedCart;

    const cartKeys = Object.keys(groupedCart);
    const order = sortBy(storeSectionsItems, "position");
    for (let section of order) {
      if (cartKeys.indexOf(section.sectionId.toString()) !== -1) {
        newSortedCart[section.sectionId] = groupedCart[section.sectionId];
      }
    }
    return newSortedCart;
  };

  const onSelectChange = (event) => {
    const v = event.target.value;
    loadStoreSectionsDetailsByStore(event.target.value).then(() =>
      setSortingStore(parseInt(v))
    );
  };

  const onCandidateProductChange = (selectedOption) => {
    setCandidateProduct(
      evaluateBestUnit({
        ...candidateProduct,
        product: selectedOption._links.self.href,
        name: selectedOption.name,
        unit:
          candidateProduct.unit && candidateProduct.quantity !== 0
            ? candidateProduct.unit
            : selectedOption.defaultUnit,
      })
    );
  };

  const onCandidateProductUnitChange = (selectedOption) => {
    const product = { ...candidateProduct, ...selectedOption };
    if (product.quantity !== 0 && product.unit !== "") {
      setCandidateProduct((prev) => ({
        ...prev,
        ...evaluateBestUnit(product),
      }));
    } else {
      setCandidateProduct({
        ...candidateProduct,
        ...selectedOption,
      });
    }
  };

  const onCandidateProductQuantityChange = (event) => {
    // eslint-disable-next-line no-useless-escape
    if (
      event.target.value.match("^[0-9]+[.,]?[0-9]*$") ||
      event.target.value === ""
    ) {
      setCandidateProduct({
        ...candidateProduct,
        quantity: event.target.value,
      });
    }
  };

  const onCandidateProductSubmit = (event) => {
    event.preventDefault();
    let error = false;
    let messages = [];
    if (!candidateProduct.product) {
      error = true;
      messages.push("Nie wybrano produktu");
    }
    if (!candidateProduct.unit) {
      error = true;
      messages.push("Nie wybrano jednostki");
    }
    if (candidateProduct.quantity <= 0) {
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
      product: candidateProduct.product,
      unit: candidateProduct.unit,
      quantity: candidateProduct.quantity,
    };
    const exists = alreadyExistsInCart(toAdd, cartItems);
    if (exists != null) {
      const newEntry = evaluateBestUnit(exists, toAdd);
      updateProductInCart(newEntry)
        .then(
          toast.success(`Produkt ${candidateProduct.name} dodany do koszyka!`)
        )
        .catch((error) =>
          toast.error("Dodawanie produktu do koszyka nie powiodło się." + error)
        );
    } else {
      addProductToCartAndFetch(toAdd)
        .then(
          toast.success(`Produkt ${candidateProduct.name} dodany do koszyka!`)
        )
        .catch(() =>
          toast.error("Dodawanie produktu do koszyka nie powiodło się.")
        );
    }
  };

  const onFocusOut = () => {
    let quantity = candidateProduct.quantity.toString();
    if (quantity === "") {
      setCandidateProduct((prevValue) => ({ ...prevValue, quantity: 0 }));
      return;
    }
    // Checking if . or , at the end of field
    if (quantity.match("/^[0-9]+[.,]$/")) {
      quantity = quantity.replace("[,.]", "");
    }
    quantity = parseFloat(quantity.replace(",", "."));
    if (candidateProduct.unit === "") {
      setCandidateProduct((prevValue) => ({ ...prevValue, quantity }));
    } else {
      const newProduct = evaluateBestUnit({
        ...candidateProduct,
        quantity,
      });
      if (JSON.stringify(newProduct) !== JSON.stringify(candidateProduct)) {
        setCandidateProduct((prevValue) => ({
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
            {storesItems.map((store) => {
              return (
                <option
                  key={store._links.self.href}
                  value={store._links.self.href}
                >
                  {store.name}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="btn btn-outline-primary editButton"
          onClick={() => setEditable(!editable)}
        >
          {editable ? "Zapisz" : "Edytuj listę zakupów"}
        </button>
      </div>
      {editable ? (
        <form onSubmit={onCandidateProductSubmit}>
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
              value={candidateProduct}
              onChange={onCandidateProductChange}
              getOptionLabel={(option) => `${option.name}`}
              getOptionValue={(option) => `${option.product}`}
              options={productsItems}
            />
            <input
              style={{ margin: "10px", width: "50px" }}
              onChange={onCandidateProductQuantityChange}
              name={"quantity"}
              value={candidateProduct.quantity}
              type="text"
              onBlur={onFocusOut}
            />
            <Select
              name="unit"
              value={candidateProduct}
              styles={selectStyleUnit}
              onChange={onCandidateProductUnitChange}
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
        Object.keys(sortedCartItems).map((sectionId) => {
          return (
            <ShoppingSectionWidget
              key={sectionId}
              section={sectionsItems[sectionId - 1].name}
              cartItems={sortedCartItems[sectionId]}
              editable={editable}
            />
          );
        })
      )}
    </div>
  );
};

ShoppingListPage.propTypes = {
  cartItems: PropTypes.array.isRequired,
  storesItems: PropTypes.array.isRequired,
  productsItems: PropTypes.array.isRequired,
  sectionsItems: PropTypes.array.isRequired,
  storeSectionsItems: PropTypes.array.isRequired,
  apiCallsInProgress: PropTypes.bool.isRequired,
  addProductToCartAndFetch: PropTypes.func.isRequired,
  updateProductInCart: PropTypes.func.isRequired,
  loadStoreSectionsDetailsByStore: PropTypes.func.isRequired,
  loadSections: PropTypes.func.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadCartProducts: PropTypes.func.isRequired,
  loadStores: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    apiCallsInProgress: state.apiCallsInProgress > 0,
    cartItems: isEmpty(state.cart) ? [] : state.cart._embedded.cartItems,
    storesItems: isEmpty(state.stores) ? [] : state.stores._embedded.stores,
    productsItems: isEmpty(state.products)
      ? []
      : state.products._embedded.products,
    sectionsItems: isEmpty(state.sections)
      ? []
      : state.sections._embedded.sections,
    storeSectionsItems: isEmpty(state.storeSections)
      ? []
      : state.storeSections._embedded.storeSections,
  };
};

const mapDispatchToProps = {
  addProductToCartAndFetch: cartActions.addProductToCartAndFetch,
  updateProductInCart: cartActions.updateProductInCart,
  loadSections: sectionsActions.loadSections,
  loadProducts: productsActions.loadProducts,
  loadCartProducts: cartActions.loadCart,
  loadStores: storesActions.loadStores,
  loadStoreSectionsDetailsByStore:
    storeSectionsActions.loadStoreSectionsDetailsByStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListPage);
