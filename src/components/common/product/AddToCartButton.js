import React from "react";
import PropTypes from "prop-types";

const AddToCartButton = ({
                             handleOnCartClick
                         }) => {
    return <button
        className="btn btn-success cart-button"
        onClick={handleOnCartClick}
        type="submit"
    >
        Dodaj do listy zakupów
    </button>;
}

AddToCartButton.propTypes = {
    handleOnCartClick: PropTypes.func.isRequired
}

export default AddToCartButton;