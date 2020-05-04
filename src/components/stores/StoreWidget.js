import React from 'react';
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

const StoreWidget = ({store}) => {
    return (<div className='jumbotron'>
        <h3>{store.fullName}</h3>
        <Link to={"/store/" + store.tableReference}>Edytuj sklep</Link>
    </div>)
}

StoreWidget.propTypes = {
    store: PropTypes.object.isRequired
}

export default StoreWidget;