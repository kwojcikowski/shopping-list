import React, { useState } from "react";
import "./ProductFormStyles.css";
import { connect } from "react-redux";
import { isEmpty } from "underscore";
import Select from "react-select";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as productActions from "../../../redux/actions/productActions";

const ProductForm = ({ unitsItems, sectionsItems, addNewProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    defaultUnit: {
      abbreviation: "",
    },
    section: {
      name: "",
    },
  });

  const onNewProductSubmit = (event) => {
    event.preventDefault();
    let error = false;
    let messages = [];
    if (!newProduct.name) {
      error = true;
      messages.push("Nie wpisano nazwy produktu");
    }
    if (!newProduct.defaultUnit.abbreviation) {
      error = true;
      messages.push("Nie wybrano jednostki");
    }
    if (!newProduct.section.name) {
      error = true;
      messages.push("Nie wybrano działu");
    }
    if (error) {
      toast.error(
        <div>
          Nie można było dodać produktu:{" "}
          {messages.map((m) => (
            <p key={m}>
              <br />
              {"- " + m}
            </p>
          ))}
        </div>
      );
      return;
    }
    addNewProduct(newProduct)
      .then(
        toast.success(
          `Produkt ${newProduct.name} został poprawnie dodany!`
        )
      )
      .catch(() => toast.error("Dodawanie produktu nie powiodło się."));
  };

  const onNewProductNameChange = (event) => {
    setNewProduct({
      ...newProduct,
      name: event.target.value,
    });
  };

  const onNewProductDefaultUnitChange = (selectedUnit) => {
    setNewProduct({
      ...newProduct,
      defaultUnit: selectedUnit,
    });
  };

  const onNewProductSectionChange = (selectedSection) => {
    setNewProduct({
      ...newProduct,
      section: selectedSection,
    });
  };

  return (
    <div className="productFormDiv">
      <div className="formContent">
      <h3>Dodaj nowy produkt</h3>
      <form onSubmit={onNewProductSubmit} className="productForm">
        <label>Nazwa produktu</label>
        <input
          name="productName"
          className="productNameInput"
          onChange={onNewProductNameChange}
          value={newProduct.name}
          type="text"
          // onBlur={onFocusOut} //TODO to be implemented
        />
        <div className="defaultUnitSelectDiv">
          <label>Domyślna jednostka</label>
          <Select
            name="unit"
            value={newProduct.defaultUnit}
            // className="defaultUnitSelect"
            onChange={onNewProductDefaultUnitChange}
            getOptionLabel={(option) => `${option.abbreviation}`}
            getOptionValue={(option) => `${option.abbreviation}`}
            options={unitsItems}
          />
        </div>
        <div className="sectionSelectDiv">
          <label>Dział</label>
          <Select
            name="section"
            value={newProduct.section}
            // className="sectionSelect"
            onChange={onNewProductSectionChange}
            getOptionLabel={(option) => `${option.name}`}
            getOptionValue={(option) => `${option.name}`}
            options={sectionsItems}
          />
        </div>
        <button type="submit" className="btn btn-outline-success">
          Dodaj produkt
        </button>
      </form>
      </div>
    </div>
  );
};

ProductForm.propTypes = {
  unitsItems: PropTypes.array.isRequired,
  sectionsItems: PropTypes.array.isRequired,
  addNewProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    unitsItems: isEmpty(state.units) ? [] : state.units._embedded.units,
    sectionsItems: isEmpty(state.sections)
      ? []
      : state.sections._embedded.sections,
  };
};

const mapDispatchToProps = {
  addNewProduct: productActions.addProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
