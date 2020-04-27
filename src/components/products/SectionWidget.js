import React from "react";
import PropTypes from "prop-types";
import ProductWidget from "./ProductWidget";

const SectionWidget = ({ section, products }) => {
  if (products.length === 0) return <></>;
  return (
    <>
      <tr key={section.id}>
        <td key={section.id}>
          <h3 key={section.id}>{section.name}</h3>
        </td>
        <td>Jednostka</td>
        <td>Ilość</td>
        <td>Do koszyka</td>
      </tr>
      {products.map((product, index) => {
        return (
          <ProductWidget key={product.id} product={product} index={index} />
        );
      })}
    </>
  );
};

SectionWidget.propTypes = {
  section: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
};

export default SectionWidget;
