import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StoreWidget from "./StoreWidget";

const StoresPage = ({ supportedStores }) => {
  return (
    <>
      <h3>Obecnie obsługiwane sklepy</h3>
      {supportedStores.map((store) => {
        return <StoreWidget store={store} key={store.id}/>;
      })}
    </>
  );
};

StoresPage.propTypes = {
  supportedStores: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    supportedStores: state.supportedStores,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StoresPage);
