import React, { useState } from "react";
import ProductForm from "./ProductForm";
import LabelWidget from "./LabelWidget";
import classNames from "classnames";
import "./ProductFormStyles.css";

const AddProductWidget = () => {
  const [panelExpanded, setPanelExpanded] = useState(false);

  const handleOnPanelExpand = () => {
    setPanelExpanded(!panelExpanded);
  };

  const productFormClassNames = classNames({
    productFormContainer: true,
    productFormHidden: !panelExpanded,
  });

  const windowContainerClassNames = classNames({
    windowContainer: true,
    windowContainerHidden: !panelExpanded,
  });

  return (
    <>
      <div className={windowContainerClassNames} />
      <div className={productFormClassNames}>
        <ProductForm />
        <LabelWidget
          panelExpanded={panelExpanded}
          handleOnPanelExpand={handleOnPanelExpand}
        />
        <div className="clear" />
      </div>
    </>
  );
};

export default AddProductWidget;
