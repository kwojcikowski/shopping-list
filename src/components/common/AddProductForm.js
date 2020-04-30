import React from "react";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import PropTypes from "prop-types";

const AddProductForm = ({
  // products,
  sections,
  errors,
  saving,
  onChange,
  onSave,
}) => {
  const units = ["szt", "g", "kg", "ml", "l"];

  return (
    <form onSubmit={onSave}>
      <TextInput
        label={"Nazwa produktu"}
        onChange={onChange}
        name={"name"}
        error={errors.name}
      />
      <SelectInput
        label={"Domyślna jednostka"}
        name={"default_unit"}
        onChange={onChange}
        options={units.map((unit) => ({
          value: unit,
          text: unit,
        }))}
        error={errors.default_unit}
      />
      <SelectInput
        label={"Dział"}
        name={"section"}
        onChange={onChange}
        options={sections.map((section) => ({
          value: section.id,
          text: section.name,
        }))}
        error={errors.section}
      />
      <button disabled={saving} type="submit" className="btn btn-primary">
        {saving ? "Zapisywanie..." : "Zapisz"}
      </button>
    </form>
  );
};

AddProductForm.propTypes = {
  // products: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
};

export default AddProductForm;
