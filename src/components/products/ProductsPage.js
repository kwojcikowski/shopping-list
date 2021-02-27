import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProductsList from "./ProductsList";
import {isEmpty} from "underscore";
import * as sectionsActions from "../../redux/actions/sectionsAction";
import * as productsActions from "../../redux/actions/productActions";
import * as unitActions from "../../redux/actions/unitsActions";
import * as cartActions from "../../redux/actions/cartActions";
import {Col, Grid, Row} from "react-flexbox-grid";
import "./ProductsPageStyle.css";
import {toast} from "react-toastify";
import ProductSelect from "../common/product/ProductSelect";
import QuantityInput from "../common/product/QuantityInput";
import UnitSelect from "../common/product/UnitSelect";
import AddToCartButton from "../common/product/AddToCartButton";
import ProductForm from "./product-form/ProductForm";

const ProductsPage = ({
                          productsItems,
                          sectionsItems,
                          unitsItems,
                          apiCallsInProgress,

                          loadSections,
                          loadProducts,
                          loadUnits,
                          addProductToCart
                      }) => {

    useEffect(() => {
        loadSections();
        loadProducts();
        loadUnits();
    }, [])

    const [cartItem, setCartItem] = useState({
        product: {},
        unit: {
            abbreviation: ""
        },
        quantity: 0
    });

    const [showForm, setShowForm] = useState(false);

    const onProductChange = (product) => {
        setCartItem({
            ...cartItem,
            product: product,
            unit: product.defaultUnit
        })
    }

    const onQuantityChange = (event) => {
        // eslint-disable-next-line no-useless-escape
        if (
            event.target.value.match("^[0-9]+[.,]?[0-9]*$") ||
            event.target.value === ""
        ) {
            setCartItem({
                ...cartItem,
                quantity: parseFloat(event.target.value),
            });
        }
    };

    const onQuantityIncrement = () => {
        setCartItem({
            ...cartItem,
            quantity: cartItem.quantity + cartItem.unit.incrementalStep
        })
    }

    const onQuantityDecrement = () => {
        setCartItem({
            ...cartItem,
            quantity: Math.max(0, cartItem.quantity - cartItem.unit.incrementalStep)
        })
    }

    const onUnitChange = (event) => {
        const selectedOption = unitsItems.find(u => u.abbreviation === event.target.value);
        setCartItem({
            ...cartItem,
            unit: selectedOption,
        });
    };

    const handleOnCartClick = (event) => {
        event.preventDefault();
        const cartItemToAdd = {
            productId: cartItem.product.id,
            unitAbbreviation: cartItem.unit.abbreviation,
            quantity: cartItem.quantity
        }

        addProductToCart(cartItemToAdd)
            .then(() => {
                toast.success(
                    `Produkt ${cartItem.product.name} dodany do koszyka!`
                );
            })
            .catch((e) => {
                throw e;
                // toast.error(`Wystąpił błąd przy dodawaniu do koszyka. ${e}`);
            });
    };


    return (
        <>
            <h1 className="products-title">Produkty</h1>
            <div className="card">
                <div className="card-body">
                    <p className="card-text">Nie możesz znaleźć produktu?</p>
                    {showForm
                        ? <>
                            <button
                                className="btn btn-success"
                                onClick={() => setShowForm(false)}
                            >
                                - Schowaj formularz
                            </button>
                            <ProductForm/>
                        </>
                        :
                        <button
                            className="btn btn-success"
                            onClick={() => setShowForm(true)}
                        >
                            + Dodaj nowy produkt
                        </button>
                    }
                </div>
            </div>

            <h2>Lista produktów</h2>
            <div>
                Aby dodać produkt do listy zakupów możesz go wyszukać...
            </div>
            <Grid className="product-search-bar" fluid>
                <Row className="centered-content search-row">
                    <Col xs={4} className="centered-content">
                        <ProductSelect
                            productItems={productsItems}
                            onProductChange={onProductChange}
                        />
                    </Col>
                    <Col xs={2} className="centered-content">
                        <QuantityInput
                            onQuantityDecrement={onQuantityDecrement}
                            onQuantityIncrement={onQuantityIncrement}
                            onQuantityChange={onQuantityChange}
                            quantity={cartItem.quantity}
                        />
                    </Col>
                    <Col xs={1} className="centered-content">
                        <UnitSelect
                            unitItems={unitsItems}
                            onUnitChange={onUnitChange}
                            unitAbbreviation={cartItem.unit.abbreviation}
                        />
                    </Col>
                    <Col xs={3} className="centered-content">
                        <AddToCartButton
                            handleOnCartClick={handleOnCartClick}
                        />
                    </Col>
                </Row>
            </Grid>
            <div>
                lub znaleźć go poniżej:
            </div>
            {apiCallsInProgress ? (
                <Spinner/>
            ) : (
                <>
                    <ProductsList
                        productsItems={productsItems}
                        sectionsItems={sectionsItems}
                    />
                </>
            )}
        </>
    );
}

ProductsPage.propTypes = {
    productsItems: PropTypes.array.isRequired,
    sectionsItems: PropTypes.array.isRequired,
    unitsItems: PropTypes.array.isRequired,
    apiCallsInProgress: PropTypes.bool.isRequired,

    loadSections: PropTypes.func.isRequired,
    loadProducts: PropTypes.func.isRequired,
    loadUnits: PropTypes.func.isRequired,
    addProductToCart: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        apiCallsInProgress: state.apiCallsInProgress > 0,
        productsItems: isEmpty(state.products)
            ? []
            : state.products._embedded.products,
        sectionsItems: isEmpty(state.sections)
            ? []
            : state.sections._embedded.sections,
        unitsItems: isEmpty(state.units)
            ? []
            : state.units._embedded.units,
    };
};

const mapDispatchToProps = {
    loadSections: sectionsActions.loadSections,
    loadProducts: productsActions.loadProducts,
    loadUnits: unitActions.loadUnits,
    addProductToCart: cartActions.addProductToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
