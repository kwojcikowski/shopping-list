import React from "react";
import "./QuantityInputStyle.css";
import PropTypes from "prop-types";

const QuantityInput = ({
                           quantity,
                           onQuantityDecrement,
                           onQuantityIncrement,
                           onQuantityChange
                       }) => {
    return <>
        <button className="btn btn-light counter-button" onClick={onQuantityDecrement}>-</button>
        <input className="form-control counter-input" placeholder="Quantity"
               value={quantity} onChange={onQuantityChange}/>
        <button className="btn btn-light counter-button" onClick={onQuantityIncrement}>+</button>
    </>
}

QuantityInput.propTypes = {
    quantity: PropTypes.number.isRequired,
    onQuantityDecrement: PropTypes.func.isRequired,
    onQuantityIncrement: PropTypes.func.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
}

export default QuantityInput;