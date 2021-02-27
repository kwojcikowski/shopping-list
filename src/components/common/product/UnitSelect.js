import React from "react";
import PropTypes from "prop-types";
import "./UnitSelectStyle.css";

const UnitSelect = ({
                        unitItems,
                        unitAbbreviation,
                        onUnitChange
                    }) => {
    return <select className="form-select unit-select" onChange={onUnitChange}
                   value={unitAbbreviation}>
        {unitItems.map(unit =>
            <option key={unit.abbreviation} value={unit.abbreviation}>{unit.abbreviation}</option>
        )}
    </select>
}

UnitSelect.propTypes = {
    unitItems: PropTypes.array.isRequired,
    unitAbbreviation: PropTypes.string.isRequired,
    onUnitChange: PropTypes.func.isRequired,
}

export default UnitSelect;