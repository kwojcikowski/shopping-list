import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StoreWidget from "./StoreWidget";
import * as storesActions from "../../redux/actions/storesActions";
import { isEmpty } from "underscore";

const StoresPage = ({ storesItems, loadStores }) => {
  useEffect(() => {
    loadStores();
  }, []);

  return (
    <>
      <h3>Obecnie obsługiwane sklepy</h3>
      {storesItems.map((store) => {
        return <StoreWidget store={store} key={store._links.self.href} />;
      })}
    </>
  );
};

StoresPage.propTypes = {
  storesItems: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    storesItems: isEmpty(state.stores) ? [] : state.stores._embedded.stores,
  };
};

const mapDispatchToProps = {
  loadStores: storesActions.loadStores,
};

export default connect(mapStateToProps, mapDispatchToProps)(StoresPage);
