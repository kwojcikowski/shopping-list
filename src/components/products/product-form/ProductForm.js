import React, { useState } from "react";
import "./ProductFormStyles.css";
import { connect } from "react-redux";
import { isEmpty } from "underscore";
import Select from "react-select";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as productActions from "../../../redux/actions/productActions";
import { handleResponse } from "../../../api/apiUtils";
import ImageContainer from "./ImageContainer";

const ProductForm = ({ unitsItems, sectionsItems, addNewProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    defaultUnitAbbreviation: "",
    sectionId: 0,
    imageUrl: "",
  });

  const [images, setImages] = useState(new Array(5).fill(false));

  const fetchProductImages = async () => {
    if (newProduct.name === "") return;
    const response = await fetch("http://localhost:4000/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({name: newProduct.name}),
    }).then(handleResponse);

    let currentIndex = 0;
    let imagesArray = [];
    for (let i = 0; i < response.length && currentIndex < 5; i++) {
      const lastSlashIndex = response[i].url.lastIndexOf("/");
      const investigatedPart = response[i].url.substring(lastSlashIndex + 1);
      console.log(response[i].url);
      console.log(investigatedPart);
      if (
        investigatedPart.includes(".png") ||
        investigatedPart.includes(".jpg")
      ) {
        console.log("passed");
        imagesArray[currentIndex++] = {
          ...response[i],
          url:
            response[i].url.substring(0, lastSlashIndex + 1) +
            response[i].url.substring(lastSlashIndex + 1).split("?")[0],
        };
      }
    }
    setImages(imagesArray);
  };

  const onNewProductSubmit = (event) => {
    event.preventDefault();
    let error = false;
    let messages = [];
    if (!newProduct.name) {
      error = true;
      messages.push("Nie wpisano nazwy produktu");
    }
    if (!newProduct.defaultUnitAbbreviation) {
      error = true;
      messages.push("Nie wybrano jednostki");
    }
    if (!newProduct.sectionId) {
      error = true;
      messages.push("Nie wybrano działu");
    }
    if (!newProduct.imageUrl) {
      error = true;
      messages.push("Nie wybrano zdjęcia");
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
      name: event.target.value
    });
  };

  const onNewProductDefaultUnitChange = (selectedUnit) => {
    setNewProduct({
      ...newProduct,
      defaultUnitAbbreviation: selectedUnit.abbreviation,
    });
  };

  const onNewProductSectionChange = (selectedSection) => {
    setNewProduct({
      ...newProduct,
      sectionId: selectedSection.id,
    });
  };

  const onNewProductImageChange = (imageUrl) => {
    setNewProduct({
      ...newProduct,
      imageUrl: imageUrl,
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
            onBlur={fetchProductImages}
          />
          <div className="defaultUnitSelectDiv">
            <label>Domyślna jednostka</label>
            <Select
              name="unit"
              value={newProduct.defaultUnit}
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
              onChange={onNewProductSectionChange}
              getOptionLabel={(option) => `${option.name}`}
              getOptionValue={(option) => `${option.name}`}
              options={sectionsItems}
            />
          </div>
          <div className="clear" />
          <label>Wybierz zdjęcie najlepiej ukazujące Twój produkt:</label>
          <div className="imagesContainer">
            {images.map((image, index) =>
              image ? (
                <div
                  className="imageWrapper"
                  style={
                    newProduct.imageUrl === image.url
                      ? { border: "2px solid dodgerblue" }
                      : {}
                  }
                  key={image.url}
                  onClick={() => onNewProductImageChange(image.url)}
                >
                  <ImageContainer
                    src={image.url}
                    width={image.width}
                    height={image.height}
                  />
                </div>
              ) : (
                <div className="imageWrapper" key={index} />
              )
            )}
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
