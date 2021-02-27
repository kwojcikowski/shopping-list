import React from "react";
import PropTypes from "prop-types";
import SectionWidget from "./SectionWidget";
import {Grid} from "react-flexbox-grid";

const ProductsList = ({productsItems, sectionsItems}) => {
    return (
        <Grid fluid>
            {sectionsItems.map(section =>
                <SectionWidget
                    key={section.id}
                    productsItems={productsItems.filter(product => product.section.id === section.id)}
                    section={section}/>
            )}
        </Grid>
    );
};

ProductsList.propTypes = {
    productsItems: PropTypes.array.isRequired,
    sectionsItems: PropTypes.array.isRequired,
};

export default ProductsList;
