import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as categoryActions from '../../redux/actions/categoryActions';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import * as productActions from '../../redux/actions/productActions';

const CategoryList = (props) => {
    useEffect(() => {
        props.actions.getCategories();
    }, []);

    const selectCategory = (category) => {
        props.actions.changeCategory(category);
        props.actions.getProducts(category.id);
    };
    return (
        <div>
            <h3>
                <Badge color="warning">Categories</Badge>
            </h3>
            <ListGroup>
                {props.categories.map((category) => (
                    <ListGroupItem
                        active={category.id === props.currentCategory.id}
                        onClick={(e) => selectCategory(category)}
                        key={category.id}
                    >
                        {category.categoryName}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentCategory: state.changeCategoryReducer,
        categories: state.categoryListReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            getCategories: bindActionCreators(
                categoryActions.getCategories,
                dispatch
            ),
            changeCategory: bindActionCreators(
                categoryActions.changeCategory,
                dispatch
            ),
            getProducts: bindActionCreators(
                productActions.getProducts,
                dispatch
            ),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
