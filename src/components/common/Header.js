import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AddProductForm from "./AddProductForm";
import * as productActions from "../../redux/actions/productActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as smartUnits from "../../tools/smartUnits";
import { FaUser } from "react-icons/fa";

const Header = ({ sections, saveProduct }) => {
  const defaultProduct = {
    name: "",
    default_unit: "",
    section: 0,
  };
  const [expand /*, setExpand*/] = useState(false);
  const [product, setProduct] = useState({ ...defaultProduct });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const activeStyle = { color: "#F15B2A" };
  const units = smartUnits.getAvailableUnits();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "section" ? parseInt(value, 10) : value,
    }));
  };

  const formIsValid = () => {
    const { name, default_unit, section } = product;
    const errors = {};

    if (!name) errors.name = "Nazwa jest wymagana.";
    if (!default_unit)
      errors.default_unit = "Domyślna jednostka jest wymagana.";
    if (!section) errors.section = "Dział jest wymagany.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOnSave = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveProduct(product)
      .then(() => {
        toast.success(`Pomyślnie dodano produkt ${product.name}.`);
        setSaving(false);
        setProduct((prevProduct) => ({ ...prevProduct, ...defaultProduct }));
      })
      .catch(() => {
        toast.error("Błąd przy dodawaniu produktu");
        setSaving(false);
      });
  };

  return (
    <>
      <div style={{ display: "inline-block", width: "100%" }}>
        <nav>
          <NavLink to="/" activeStyle={activeStyle} exact>
            Lista zakupów
          </NavLink>
          {" | "}
          <NavLink to={"/products"} activeStyle={activeStyle}>
            Produkty
          </NavLink>
          {" | "}
          <NavLink to="/recipes" activeStyle={activeStyle}>
            Przepisy
          </NavLink>
          {" | "}
          <NavLink to="/stores" activeStyle={activeStyle}>
            Sklepy
          </NavLink>
          <NavLink to="/profile" activeStyle={activeStyle}>
            <p style={{ float: "right" }}>
              Zaloguj się
              <FaUser />
            </p>
          </NavLink>
        </nav>
      </div>
      {/*<button*/}
      {/*  className="btn btn-outline-info"*/}
      {/*  style={{ marginLeft: "30px" }}*/}
      {/*  onClick={() => setExpand(!expand)}*/}
      {/*>*/}
      {/*  Dodaj produkt*/}
      {/*</button>*/}
      {expand ? (
        <AddProductForm
          product={product}
          units={units}
          sections={sections}
          onSave={handleOnSave}
          onChange={handleOnChange}
          errors={errors}
          saving={saving}
        />
      ) : (
        <></>
      )}
    </>
  );
};

Header.propTypes = {
  sections: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  saveProduct: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    sections: state.sections,
    auth: state.auth,
  };
}

const mapDispatchToProps = {
  saveProduct: productActions.saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
