import React from "react";
import PropTypes from "prop-types";
import ProductWidget from "./ProductWidget";
import {Row} from "react-flexbox-grid";
import "./SectionWidgetStyle.css"

const SectionWidget = ({section, productsItems}) => {
    if (productsItems.length === 0) return <></>;
    return (
        <div className="section-widget">
            <h2 className="section-widget-title">{section.name}</h2>
            <Row>
                {productsItems.map(product =>
                    <ProductWidget
                        key={product.id}
                        product={product}
                    />
                )}
            </Row>
        </div>
    );
};

SectionWidget.propTypes = {
    section: PropTypes.object.isRequired,
    productsItems: PropTypes.array.isRequired,
};

export default SectionWidget;
