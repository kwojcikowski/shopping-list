import React, { useState } from "react";
import InlineSelectInput from "../common/InlineSelectInput";
import { getAvailableUnits } from "../../tools/smartUnits";
import InlineTextInput from "../common/InlineTextInput";

const ShoppingProductWidget = ({ product }) => {
  const [cartProduct, setCartProduct] = useState({ ...product });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setCartProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <tr key={product.uid} className={"listRow"}>
      <td className={"listColumn"}>{cartProduct.productName}</td>
      <td>
        <InlineTextInput
          onChange={onChangeHandler}
          name={"quantity"}
          value={cartProduct.quantity}
        />
      </td>
      <td>
        <InlineSelectInput
          name={"unit"}
          onChange={onChangeHandler}
          value={cartProduct.unit}
          defaultOption={cartProduct.unit}
          options={getAvailableUnits()}
        />
      </td>
    </tr>
  );
};

export default ShoppingProductWidget;
