import React from "react";
import TextInput from "./TextInput";
import PropTypes from "prop-types";

const AddProductForm = ({
  product,
  sections,
  errors,
  saving,
  onChange,
  onSave,
  units,
}) => {
  return (
    <form onSubmit={onSave}>
      <TextInput
        label={"Nazwa produktu"}
        onChange={onChange}
        name={"name"}
        value={product.name}
        error={errors.name}
      />
      <div className="form-group">
        <label htmlFor="default_unit">Domyślna jednostka</label>
        <div className="field">
          <select
            className="form-control"
            name="default_unit"
            value={product.default_unit}
            onChange={onChange}
          >
            <option value="">{""}</option>
            {units.map((option) => {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          {errors.default_unit && (
            <div className="alert alert-danger">{errors.default_unit}</div>
          )}
        </div>
      </div>
      {/*<SelectInput*/}
      {/*  label={"Domyślna jednostka"}*/}
      {/*  name={"default_unit"}*/}
      {/*  onChange={onChange}*/}
      {/*  value={product.default_unit}*/}
      {/*  options={units.map((unit) => ({*/}
      {/*    value: unit,*/}
      {/*    text: unit,*/}
      {/*  }))}*/}
      {/*  error={errors.default_unit}*/}
      {/*/>*/}
      <div className="form-group">
        <label htmlFor="section">Dział</label>
        <div className="field">
          <select
            className="form-control"
            name="section"
            value={product.section}
            onChange={onChange}
          >
            <option value={0}>{""}</option>
            {sections.map((section) => {
              return (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              );
            })}
          </select>
          {errors.section && (
            <div className="alert alert-danger">{errors.section}</div>
          )}
        </div>
      </div>
      {/*<SelectInput*/}
      {/*  label={"Dział"}*/}
      {/*  name={"section"}*/}
      {/*  value={product.section}*/}
      {/*  onChange={onChange}*/}
      {/*  options={sections.map((section) => ({*/}
      {/*    value: section.id,*/}
      {/*    text: section.name,*/}
      {/*  }))}*/}
      {/*  error={errors.section}*/}
      {/*/>*/}
      <button disabled={saving} type="submit" className="btn btn-primary">
        {saving ? "Zapisywanie..." : "Zapisz"}
      </button>
    </form>
  );
};

AddProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
  units: PropTypes.array.isRequired,
};

export default AddProductForm;
