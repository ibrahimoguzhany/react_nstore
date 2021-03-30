import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../redux/actions/cartActions';
import { Table, Button } from 'reactstrap';
import alertify from 'alertifyjs';

const CartDetail = (props) => {
    const removeFromCart = (product) => {
        props.actions.removeFromCart(product);
        alertify.error(product.productName + ' sepetten silindi.');
    };

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.cart.map((cartItem) => (
                        <tr key={cartItem.product.id}>
                            <td scope="row">{cartItem.product.id}</td>
                            <td>{cartItem.product.productName}</td>
                            <td>{cartItem.product.unitPrice}</td>
                            <td>{cartItem.product.quantity}</td>
                            <td>
                                <Button
                                    color="danger"
                                    onClick={() =>
                                        removeFromCart(cartItem.product)
                                    }
                                >
                                    Sil
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            removeFromCart: bindActionCreators(
                cartActions.removeFromCart,
                dispatch
            ),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
