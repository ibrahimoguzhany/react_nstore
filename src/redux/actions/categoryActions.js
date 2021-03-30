import * as actionTypes from './actionTypes';

export function changeCategory(category) {
    return {
        type: actionTypes.CHANGE_CATEGORY,
        payload: category,
    };
}

export const getCategoriesSuccess = (categories) => {
    return {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        payload: categories,
    };
};

export const getCategories = () => {
    return function (dispatch) {
        let url = 'http://localhost:3000/categories';
        return fetch(url)
            .then((response) => response.json())
            .then((result) => dispatch(getCategoriesSuccess(result)));
    };
};
