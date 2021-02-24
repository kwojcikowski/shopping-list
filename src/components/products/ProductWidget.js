import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import * as productActions from "../../redux/actions/productActions";
import { toast } from "react-toastify";
import Select from "react-select";
import { isEmpty } from "underscore";
import { handleResponse } from "../../api/apiUtils";
import ProgressiveImageContainer from "../common/ProgressiveImageContainer";

const ProductWidget = ({
  product,
  index,
  unitsItems,
  addProductToCart,
  deleteProduct,
}) => {
  const bgColor = index % 2 === 0 ? { backgroundColor: "#EEEEEE" } : {};

  const [cartCandidate, setCartCandidate] = useState({
    product: product,
    unit: product.defaultUnit,
    quantity: 0,
  });

  const [image, setImage] = useState({
    src: "",
    thumb: "",
    width: "",
    height: "",
  });

  const progressiveImageWrapperStyle = {
    width: "100px",
    height: "100px",
    background: "rgba(0, 0, 0, 0.05)",
    margin: "0 5px 1vh 5px",
  };

  const loadImages = async () => {
    //First load thumb to support lazy loading
    const thumbnailImage = await fetch(product._links.thumbImage.href).then(
      handleResponse
    );
    if (thumbnailImage)
      setImage({
        ...image,
        thumb: "data:image/png;base64," + thumbnailImage.image,
      });

    const fullImage = await fetch(product._links.image.href).then(
      handleResponse
    );
    if (fullImage)
      setImage({
        ...image,
        width: fullImage.width,
        height: fullImage.height,
        src: "data:image/png;base64," + fullImage.image,
      });
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleOnCartClick = () => {
    addProductToCart(cartCandidate)
      .then(() => {
        toast.success(
          `Produkt ${cartCandidate.product.name} dodany do koszyka!`
        );
      })
      .catch((e) => {
        throw e;
        // toast.error(`Wystąpił błąd przy dodawaniu do koszyka. ${e}`);
      });
  };

  const onProductDelete = () => {
    deleteProduct(product)
      .then(() => {
        toast.success(`Produkt ${product.name} pomyślnie usunięty.`);
      })
      .catch(() => {
        toast.error(`Usuwanie produktu ${product.name} nie powiodło się.`);
      });
  };

  const onUnitChange = (selectedOption) => {
    const product = { ...cartCandidate, unit: selectedOption };
    if (product.quantity !== 0 && product.unit.abbreviation !== "") {
      setCartCandidate((prev) => ({
        ...prev,
        ...product,
      }));
    } else {
      setCartCandidate({
        ...cartCandidate,
        unit: selectedOption,
      });
    }
  };

  const onCartCandidateQuantityChange = (event) => {
    // eslint-disable-next-line no-useless-escape
    if (
      event.target.value.match("^[0-9]+[.,]?[0-9]*$") ||
      event.target.value === ""
    ) {
      setCartCandidate({
        ...cartCandidate,
        quantity: event.target.value,
      });
    }
  };

  return (
    <tr style={bgColor} key={product.id}>
      <td>
        <div style={progressiveImageWrapperStyle}>
          <ProgressiveImageContainer
            src={image.src}
            width={image.width}
            height={image.height}
            thumb={image.thumb}
            containerWidth={progressiveImageWrapperStyle.width}
            containerHeight={progressiveImageWrapperStyle.height}
          />
        </div>
      </td>
      <td>{product.name}</td>
      <td>
        <Select
          name="unit"
          value={cartCandidate.unit}
          onChange={onUnitChange}
          getOptionLabel={(option) => `${option.abbreviation}`}
          getOptionValue={(option) => `${option.abbreviation}`}
          options={unitsItems}
        />
      </td>
      <td>
        <input
          style={{ margin: "10px", width: "50px" }}
          onChange={onCartCandidateQuantityChange}
          name={"quantity"}
          value={cartCandidate.quantity}
          type="text"
          // onBlur={onFocusOut}
        />
      </td>
      <td>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={handleOnCartClick}
        >
          Dodaj do koszyka
        </button>
      </td>
    </tr>
  );
};

ProductWidget.propTypes = {
  product: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  unitsItems: PropTypes.array.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    unitsItems: isEmpty(state.units) ? [] : state.units._embedded.units,
  };
};

const mapDispatchToProps = {
  addProductToCart: cartActions.addProductToCart,
  deleteProduct: productActions.deleteProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductWidget);
