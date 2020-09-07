import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ShoppingSectionWidget from "./ShoppingSectionWidget";
import { groupBy, sortBy, isEmpty } from "underscore";
import "./ShoppingListPageStyle.css";
import * as productsActions from "../../redux/actions/productActions";
import * as sectionsActions from "../../redux/actions/sectionsAction";
import * as unitsActions from "../../redux/actions/unitsActions";
import * as storesActions from "../../redux/actions/storesActions";
import * as cartActions from "../../redux/actions/cartActions";
import * as storeSectionsActions from "../../redux/actions/storeSectionsActions";
import Select from "react-select";
import { toast } from "react-toastify";
import AddProductWidget from "../products/product-form/AddProductWidget";

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
  unitsItems,
  storeSectionsItems,
  apiCallsInProgress,
  addProductToCart,
  updateCart,
  loadSections,
  loadUnits,
  loadProducts,
  loadCartProducts,
  loadStores,
  loadStoreSectionsByStoreUrlFriendlyName,
}) => {
  const [editable, setEditable] = useState(false);
  const [sortedCartItems, setSortedCartItems] = useState({});
  const [sortingStore, setSortingStore] = useState("");
  const [candidateProduct, setCandidateProduct] = useState({
    product: {
      name: "",
    },
    unit: {
      abbreviation: "",
    },
    quantity: 0,
  });

  // On component mount load dependencies
  useEffect(() => {
    try {
      loadSections();
      loadProducts();
      loadStores();
      loadCartProducts();
      loadUnits();
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
      (item) =>
        item.product.section._links.self.href.replace("{?projection}", "")
    );
    if (!sortingStore) return groupedCart;

    const cartKeys = Object.keys(groupedCart);
    const order = sortBy(storeSectionsItems, "position");
    for (let storeSection of order) {
      let sectionLink = storeSection.section._links.self.href.replace(
        "{?projection}",
        ""
      );
      if (cartKeys.indexOf(sectionLink) !== -1) {
        newSortedCart[sectionLink] = groupedCart[sectionLink];
      }
    }
    return newSortedCart;
  };

  const onSelectChange = (event) => {
    const v = event.target.value;
    loadStoreSectionsByStoreUrlFriendlyName(event.target.value).then(() =>
      setSortingStore(v)
    );
  };

  const onCandidateProductChange = (selectedOption) => {
    setCandidateProduct({
      ...candidateProduct,
      product: selectedOption,
      unit:
        candidateProduct.unit.abbreviation && candidateProduct.quantity !== 0
          ? candidateProduct.unit
          : unitsItems.find(
              (unit) => unit.abbreviation === selectedOption.defaultUnit
            ),
    });
  };

  const onCandidateProductUnitChange = (selectedOption) => {
    const product = { ...candidateProduct, unit: selectedOption };
    if (product.quantity !== 0 && product.unit.abbreviation !== "") {
      setCandidateProduct((prev) => ({
        ...prev,
        ...product,
      }));
    } else {
      setCandidateProduct({
        ...candidateProduct,
        unit: selectedOption,
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
    if (!candidateProduct.product.name) {
      error = true;
      messages.push("Nie wybrano produktu");
    }
    if (!candidateProduct.unit.abbreviation) {
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
              {"- " + m}
            </p>
          ))}
        </div>
      );
      return;
    }
    addProductToCart(candidateProduct)
      .then(
        toast.success(
          `Produkt ${candidateProduct.product.name} dodany do koszyka!`
        )
      )
      .catch(() =>
        toast.error("Dodawanie produktu do koszyka nie powiodło się.")
      );
  };

  const onListSave = () => {
    if (editable) updateCart(cartItems);
    setEditable(!editable);
  };

  // const onFocusOut = () => {
  //   let quantity = candidateProduct.quantity.toString();
  //   if (quantity === "") {
  //     setCandidateProduct((prevValue) => ({ ...prevValue, quantity: 0 }));
  //     return;
  //   }
  //   // Checking if . or , at the end of field
  //   if (quantity.match("/^[0-9]+[.,]$/")) {
  //     quantity = quantity.replace("[,.]", "");
  //   }
  //   quantity = parseFloat(quantity.replace(",", "."));
  //   if (candidateProduct.unit === "") {
  //     setCandidateProduct((prevValue) => ({ ...prevValue, quantity }));
  //   } else {
  //     const newProduct = {
  //       ...candidateProduct,
  //       quantity,
  //     };
  //     if (JSON.stringify(newProduct) !== JSON.stringify(candidateProduct)) {
  //       setCandidateProduct((prevValue) => ({
  //         ...prevValue,
  //         ...newProduct,
  //         quantity: newProduct.quantity.toString(),
  //       }));
  //     }
  //   }
  // };

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
                  key={store.urlFriendlyName}
                  value={store.urlFriendlyName}
                >
                  {store.name}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="btn btn-outline-primary editButton"
          onClick={onListSave}
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
              value={candidateProduct.product}
              onChange={onCandidateProductChange}
              getOptionLabel={(option) => `${option.name}`}
              getOptionValue={(option) => `${option.name}`}
              options={productsItems}
            />
            <input
              style={{ margin: "10px", width: "50px" }}
              onChange={onCandidateProductQuantityChange}
              name={"quantity"}
              value={candidateProduct.quantity}
              type="text"
              // onBlur={onFocusOut} //TODO to be implemented
            />
            <Select
              name="unit"
              value={candidateProduct.unit}
              styles={selectStyleUnit}
              onChange={onCandidateProductUnitChange}
              getOptionLabel={(option) => `${option.abbreviation}`}
              getOptionValue={(option) => `${option.abbreviation}`}
              options={unitsItems}
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
        Object.keys(sortedCartItems).map((sectionLink) => {
          return (
            <ShoppingSectionWidget
              key={sectionLink}
              section={
                sectionsItems.find(
                  (section) => section._links.self.href === sectionLink
                ).name
              }
              cartItems={sortedCartItems[sectionLink]}
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
  unitsItems: PropTypes.array.isRequired,
  storeSectionsItems: PropTypes.array.isRequired,
  apiCallsInProgress: PropTypes.bool.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  loadSections: PropTypes.func.isRequired,
  loadUnits: PropTypes.func.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadCartProducts: PropTypes.func.isRequired,
  loadStores: PropTypes.func.isRequired,
  loadStoreSectionsByStoreUrlFriendlyName: PropTypes.func.isRequired,
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
    unitsItems: isEmpty(state.units) ? [] : state.units._embedded.units,
    storeSectionsItems: isEmpty(state.storeSections)
      ? []
      : state.storeSections._embedded.storeSections,
  };
};

const mapDispatchToProps = {
  addProductToCart: cartActions.addProductToCart,
  updateCart: cartActions.updateCart,
  loadSections: sectionsActions.loadSections,
  loadUnits: unitsActions.loadUnits,
  loadProducts: productsActions.loadProducts,
  loadCartProducts: cartActions.loadCart,
  loadStores: storesActions.loadStores,
  loadStoreSectionsByStoreUrlFriendlyName:
    storeSectionsActions.loadStoreSectionsByStoreUrlFriendlyName,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListPage);
