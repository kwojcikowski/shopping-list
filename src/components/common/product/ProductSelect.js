import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

const ProductSelect = ({
                           productItems,
                           onProductChange
                       }) => {
    return <Select
        onChange={onProductChange}
        options={productItems}
        getOptionLabel={(option) => `${option.name}`}
        getOptionValue={(option) => option.id}
        placeholder={<div>Wybierz produkt</div>}
    />

}

ProductSelect.propTypes = {
    productItems: PropTypes.array.isRequired,
    onProductChange: PropTypes.func.isRequired,
}

export default ProductSelect;