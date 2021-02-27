import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import {toast} from "react-toastify";
import {isEmpty} from "underscore";
import {handleResponse} from "../../api/apiUtils";
import ProgressiveImageContainer from "../common/ProgressiveImageContainer";
import {Col} from 'react-flexbox-grid';
import "./ProductWidgetStyle.css";
import QuantityInput from "../common/product/QuantityInput";
import UnitSelect from "../common/product/UnitSelect";
import AddToCartButton from "../common/product/AddToCartButton";

const ProductWidget = ({
                           product,
                           unitsItems,
                           addProductToCart,
                       }) => {

    const [cartCandidate, setCartCandidate] = useState({
        product: product,
        unit: product.defaultUnit,
        quantity: 0,
    });

    const [image, setImage] = useState({
        src: "",
        thumb: "",
        width: 0,
        height: 0,
    });

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

        const cartItemToAdd = {
            productId: cartCandidate.product.id,
            unitAbbreviation: cartCandidate.unit.abbreviation,
            quantity: cartCandidate.quantity
        }

        addProductToCart(cartItemToAdd)
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

    const onUnitChange = (event) => {
        const selectedOption = unitsItems.find(u => u.abbreviation === event.target.value);
        setCartCandidate({
            ...cartCandidate,
            unit: selectedOption,
        });
    };

    const onQuantityChange = (event) => {
        // eslint-disable-next-line no-useless-escape
        if (
            event.target.value.match("^[0-9]+[.,]?[0-9]*$") ||
            event.target.value === ""
        ) {
            setCartCandidate({
                ...cartCandidate,
                quantity: parseFloat(event.target.value),
            });
        }
    };

    const onQuantityIncrement = () => {
        setCartCandidate({
            ...cartCandidate,
            quantity: cartCandidate.quantity + cartCandidate.unit.incrementalStep
        })
    }

    const onQuantityDecrement = () => {
        setCartCandidate({
            ...cartCandidate,
            quantity: Math.max(0, cartCandidate.quantity - cartCandidate.unit.incrementalStep)
        })
    }

    return (
        <Col xs={6} md={4} lg={3}>
            <div className="product-widget-wrapper">
                <div className="product-image-wrapper">
                    <ProgressiveImageContainer
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        thumb={image.thumb}
                        containerWidth="220px"
                        containerHeight="120px"
                    />
                </div>
                <div className="product-label-wrapper">
                    {product.name}
                </div>
                <div className="add-to-cart-bar">
                    <div className="quantity-wrapper">
                        <QuantityInput
                            quantity={cartCandidate.quantity}
                            onQuantityDecrement={onQuantityDecrement}
                            onQuantityIncrement={onQuantityIncrement}
                            onQuantityChange={onQuantityChange}
                        />
                    </div>
                    <div className="unit-select-wrapper">
                        <UnitSelect unitItems={unitsItems}
                                    onUnitChange={onUnitChange}
                                    unitAbbreviation={cartCandidate.unit.abbreviation}
                        />
                    </div>
                    <div style={{clear: "both"}}/>
                    <div className="cart-button-wrapper">
                        <AddToCartButton
                            handleOnCartClick={handleOnCartClick}
                        />
                    </div>
                </div>
            </div>
        </Col>
    );
};

ProductWidget.propTypes = {
    product: PropTypes.object.isRequired,
    unitsItems: PropTypes.array.isRequired,
    addProductToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        unitsItems: isEmpty(state.units) ? [] : state.units._embedded.units,
    };
};

const mapDispatchToProps = {
    addProductToCart: cartActions.addProductToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductWidget);
