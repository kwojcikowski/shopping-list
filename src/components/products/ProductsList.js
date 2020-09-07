import React from "react";
import PropTypes from "prop-types";
import SectionWidget from "./SectionWidget";

const ProductsList = ({ productsItems, sectionsItems }) => {
  return (
    <>
      <table className="table">
        <tbody>
          {sectionsItems.map((section) => (
            <SectionWidget
              key={section._links.self.href}
              productsItems={productsItems.filter(
                (product) =>
                  product.section._links.self.href.replace(
                    "{?projection}",
                    ""
                  ) === section._links.self.href.replace("{?projection}", "")
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
  productsItems: PropTypes.array.isRequired,
  sectionsItems: PropTypes.array.isRequired,
};

export default ProductsList;
