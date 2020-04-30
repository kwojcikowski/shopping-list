import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const StoresPage = ({ supportedStores }) => {
  return (
    <>
      <h3>Obecnie obsługiwane sklepy</h3>
      {supportedStores.map((store) => {
        return <div key={store.id}>{store.fullName}</div>;
      })}
    </>
  );
};

StoresPage.propTypes = {
  // sections: PropTypes.array.isRequired,
  supportedStores: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    supportedStores: state.supportedStores,
    // sections: state.sections,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(StoresPage);
