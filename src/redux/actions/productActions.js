import * as actionTypes from './actionTypes';

export const getProductsSuccess = (products) => {
    return { type: actionTypes.GET_PRODUCTS_SUCCESS, payload: products };
};

export const saveProductApi = (product) => {
    return fetch('http://localhost:3000/products/' + (product.id || ''), {
        method: product.id ? 'PUT' : 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(product),
    })
        .then(handleResponse)
        .catch(handleError);
};

export const saveProduct = (product) => {
    return (dispatch) => {
        return saveProductApi(product)
            .then((savedProduct) => {
                product.id
                    ? dispatch(updateProductSuccess(savedProduct))
                    : dispatch(createProductSuccess(savedProduct));
            })
            .catch((error) => {
                throw error;
            });
    };
};

export const handleResponse = async (response) => {
    if (response.ok) {
        return response.json();
    }

    const error = await response.text();
    throw new Error(error);
};

export const handleError = (error) => {
    console.log('Bir hata olustu');
    throw error;
};

export const getProducts = (categoryId) => {
    return function (dispatch) {
        let url = 'http://localhost:3000/products';
        if (categoryId) {
            url = url + '?categoryId=' + categoryId;
        }
        return fetch(url)
            .then((response) => response.json())
            .then((result) => dispatch(getProductsSuccess(result)));
    };
};

export const createProductSuccess = (product) => {
    return {
        type: actionTypes.CREATE_PRODUCT_SUCCESS,
        payload: product,
    };
};

export const updateProductSuccess = (product) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        payload: product,
    };
};
