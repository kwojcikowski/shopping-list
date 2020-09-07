import React from "react";
import "./ProductFormStyles.css";
import PropTypes from "prop-types";

const LabelWidget = ({ panelExpanded, handleOnPanelExpand }) => {
  return (
    <div className="labelDiv" onClick={handleOnPanelExpand}>
      {panelExpanded ? (
        <p className="label">
          Schowaj
          <br />
          panel
        </p>
      ) : (
        <p className="label">
          Dodaj <br/>
          nowy <br/>produkt
        </p>
      )}
    </div>
  );
};

LabelWidget.propTypes = {
  panelExpanded: PropTypes.bool.isRequired,
  handleOnPanelExpand: PropTypes.func.isRequired,
};

export default LabelWidget;
