import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

const SectionSelect = ({
                           sectionsItems,
                           onSectionChange
                       }) => {
    return <Select
        onChange={onSectionChange}
        options={sectionsItems}
        getOptionLabel={(option) => `${option.name}`}
        getOptionValue={(option) => option.id}
        placeholder={<div>Wybierz dział</div>}
    />

}

SectionSelect.propTypes = {
    sectionsItems: PropTypes.array.isRequired,
    onSectionChange: PropTypes.func.isRequired,
}

export default SectionSelect;