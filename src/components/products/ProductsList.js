import React from "react";
import PropTypes from "prop-types";
import SectionWidget from "./SectionWidget";

const ProductsList = ({ products, sections }) => {
  return (
    <>
      <table className="table">
        <tbody>
          {sections.map((section) => (
            <SectionWidget
              key={section.id}
              products={products.filter(
                (product) => product.section === section.id
              )}
              section={section}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

ProductsList.propTypes = {
  products: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
};

export default ProductsList;
