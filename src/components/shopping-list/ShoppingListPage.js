import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Spinner from "../common/Spinner";
import ProductsList from "../products/ProductsList";

const ShoppingListPage = ({apiCallsInProgress, cart}) => {

    return (
        <div className="jumbotron">
            {console.log(apiCallsInProgress)}
            <h3>Twoja lista zakupów</h3>
            {apiCallsInProgress ? (
                <Spinner />
            ) : (
                console.log(cart)
            )}
            {cart.map(entry => {
                return (<div key={entry.uid} >{entry.productName}</div>)
            })}
        </div>);
}

ShoppingListPage.propTypes = {
    cart: PropTypes.array.isRequired,
    apiCallsInProgress: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
    return{
        apiCallsInProgress: state.apiCallsInProgress > 0,
        cart: state.cart,
    }
}

function mapDispatchToProps(dispatch) {
    return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListPage);
