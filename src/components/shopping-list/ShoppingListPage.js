import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ShoppingSectionWidget from "./ShoppingSectionWidget";
import { groupBy, sortBy } from "underscore";
import "./ShoppingListPageStyle.css";

const ShoppingListPage = ({
  apiCallsInProgress,
  splitSections,
  supportedStores,
}) => {
  const [editable, setEditable] = useState(false);

  return (
    <div className="list">
      <h3 className={"listTitle"}>Twoja lista zakupów</h3>
      <div className="optionsDiv">
        <div className="sortingDiv">
          <p className="sortingLabel">Sortuj według</p>
          <select className="sortingSelect">
            {supportedStores.map((store) => {
              return <option key={store.id}>{store.fullName}</option>;
            })}
          </select>
        </div>
        <button
          onClick={() => setEditable(!editable)}
          className="btn btn-outline-primary editButton"
        >
          {editable ? "Zapisz" : "Edytuj listę zakupów"}
        </button>
      </div>

      {apiCallsInProgress ? (
        <Spinner />
      ) : (
        Object.keys(splitSections).map((section) => {
          return (
            <ShoppingSectionWidget
              key={section}
              section={section}
              products={splitSections[section]}
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
  splitSections: PropTypes.object.isRequired,
  supportedStores: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    apiCallsInProgress: state.apiCallsInProgress > 0,
    cart: state.cart,
    splitSections: groupBy(sortBy(state.cart, "productName"), "sectionName"),
    supportedStores: state.supportedStores,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListPage);
