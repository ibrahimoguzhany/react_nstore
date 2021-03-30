import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../redux/actions/categoryActions';
import { saveProduct } from '../../redux/actions/productActions';

const AddOrUpdateProduct = ({
    products,
    categories,
    getProducts,
    getCategories,
    saveProduct,
    ...props
}) => {
    const [product, setProduct] = useState({ ...props.product });
    useEffect(() => {
        if (categories.length === 0) {
            getCategories();
        }
        setProduct({ ...props.product });
    }, [props.product]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((previousProduct) => ({
            ...previousProduct,
            [name]: name === 'categoryId' ? parseInt(value, 10) : value,
        }));
    };

    const handleSave = (event) => {
        event.preventDefault();
        saveProduct(product).then(() => {
            history.push('/');
        });
    };
};

const mapDispatchToProps = () => {
    getCategories, saveProduct;
};

export const getProductById = (products, productId) => {
    let product = products.find((product) => product.id === productId) || null;
    return product;
};

const mapStateToProps = (state, ownProps) => {
    const productId = ownProps.match.params.productId;
    const product =
        productId && state.productReducer.length > 0
            ? getProductById(state.productRecuder, productId)
            : {};
    return {
        product,
        products: state.productReducer,
        categories: state.categoryReducer,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
