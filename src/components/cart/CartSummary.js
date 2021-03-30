import React from 'react';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavItem,
    NavLink,
    Badge,
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from '../../redux/actions/productActions';
import * as cartActions from '../../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';

const CartSummary = (props) => {
    const removeFromCart = (product) => {
        props.actions.removeFromCart(product);
        alertify.error(product.productName + ' sepetten silindi.');
    };

    const renderSummary = (props) => {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    Sepetim
                </DropdownToggle>
                <DropdownMenu right>
                    {props.cart.map((cartItem) => (
                        <DropdownItem key={cartItem.product.id}>
                            <Badge
                                color="danger"
                                onClick={() => removeFromCart(cartItem.product)}
                            >
                                X
                            </Badge>
                            {cartItem.product.productName}
                            <Badge color="success">{cartItem.quantity}</Badge>
                        </DropdownItem>
                    ))}

                    <DropdownItem divider />
                    <DropdownItem>
                        <Link to={'/cart'}> Sepete git</Link>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    };

    const renderEmpty = (props) => {
        return (
            <NavItem>
                <NavLink>Sepetiniz Boş</NavLink>
            </NavItem>
        );
    };

    return (
        <div>
            {props.cart.length > 0 ? renderSummary(props) : renderEmpty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
