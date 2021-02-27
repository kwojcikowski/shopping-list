import React, { useState } from "react";
import { connect } from "react-redux";
import { isEmpty } from "underscore";
import Select from "react-select";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as productActions from "../../../redux/actions/productActions";
import { handleResponse } from "../../../api/apiUtils";
import ImageContainer from "./ImageContainer";
import {Button, Form} from "react-bootstrap";
import "./ProductFormStyles.css";
import SectionSelect from "../../common/product/SectionSelect";

const ProductForm = ({ unitsItems, sectionsItems, addNewProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    unit: {},
    section: {},
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
    if (!newProduct.unit) {
      error = true;
      messages.push("Nie wybrano jednostki");
    }
    if (!newProduct.section) {
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
    addNewProduct({
      name: newProduct.name,
      defaultUnitAbbreviation: newProduct.unit.abbreviation,
      sectionId: newProduct.section.id,
      imageUrl: newProduct.imageUrl
    })
      .then(
        toast.success(
          `Produkt ${newProduct.name} został poprawnie dodany!`
        )
      )
      .catch(() => toast.error("Dodawanie produktu nie powiodło się."));
  };

  const onNameChange = (event) => {
    setNewProduct({
      ...newProduct,
      name: event.target.value
    });
  };

  const onUnitChange = (selectedUnit) => {
    setNewProduct({
      ...newProduct,
      unit: selectedUnit,
    });
  };

  const onSectionChange = (selectedSection) => {
    setNewProduct({
      ...newProduct,
      section: selectedSection,
    });
  };

  const onImageChange = (imageUrl) => {
    setNewProduct({
      ...newProduct,
      imageUrl: imageUrl,
    });
  };

  return (
      <Form className="product-form">
        <div className="np-input-wrapper">
          <Form.Label>Nazwa produktu</Form.Label>
          <Form.Control as="input" onBlur={fetchProductImages} onChange={onNameChange} value={newProduct.name}/>
        </div>
        <div className="np-unit-wrapper">
        <Form.Label>Domyślna jednostka</Form.Label>
          <Select
              onChange={onUnitChange}
              options={unitsItems}
              getOptionLabel={(option) => `${option.abbreviation}`}
              getOptionValue={(option) => option.abbreviation}
              placeholder={<div>Wybierz jednostkę</div>}
              />
        </div>
        <div className="np-section-wrapper">
        <Form.Label>Dział</Form.Label>
        <SectionSelect
            sectionsItems={sectionsItems}
            onSectionChange={onSectionChange}
        />
        </div>
        <div className="np-image-wrapper">
        <Form.Label>Wybierz zdjęcie najlepiej ukazujące produkt:</Form.Label>
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
                        onClick={() => onImageChange(image.url)}
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
        </div>
        <Button variant="success" type="submit" onClick={onNewProductSubmit}>Dodaj produkt</Button>
      </Form>
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
