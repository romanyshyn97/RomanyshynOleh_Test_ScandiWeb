import * as actionTypes from './types';
import { GET_CATEGORY, GET_CURRENCIES_CATEGORIES, GET_CURRENT_PRODUCT } from '../GQL/queries';

export const addToCart = (itemID, attr) => {
    return{
        type: actionTypes.ADD_TO_CART,
        payload: {
            id:itemID,
            attr
        }
    }
  
}

export const totalQTY = () => {
  return{
    type:actionTypes.TOTAL_QTY
  }
}

export const makeOrder = () => {
  return {
    type: actionTypes.MAKE_ORDER
  }
}


export const increaseQTY = (itemID, value, atrname) => {
    return {
        type: actionTypes.INCREASE_QTY,
        payload:{
            id: itemID,
            qty: value,
            atrExist: atrname
        }
    }
}
export const decreaseQTY = (itemID, value, atrname) => {
  return {
      type: actionTypes.DECREASE_QTY,
      payload:{
          id: itemID,
          qty: value,
          atrExist: atrname
      }
  }
}

export const loadCurrentItem = (itemID) => {
    return{
        type: actionTypes.LOAD_CURRENT_ITEM,
        payload: {id:itemID}
    }
}

export const changeCategory = () => {
  return{
    type: actionTypes.CHANGE_CATEGORY
  }
}

export const changeCurrency = (currency) => {
  return{
    type: actionTypes.CHANGE_CURRENCY,
    payload: currency
  }
}

export const selectAttr = (attr) => {
  return{
    type: actionTypes.SELECT_ATTRIBUTE,
    payload: attr
  }
}

export const fetchProductsBegin = () => ({
    type: actionTypes.FETCH_PRODUCTS_BEGIN
  });

  export const fetchCurrentProductBegin = () => ({
    type: actionTypes.FETCH_CURRENT_PRODUCT_BEGIN
  })
  
  export const fetchProductsSuccess = products => ({
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: { products }
  });

  export const fetchCurrentProductSuccess = product => ({
    type:actionTypes.FETCH_CURRENT_PRODUCT,
    payload: {product}
  })

  export const fetchCurrenciesAndCategoriesNamesSuccess = ({currencies,categories}) => ({
    type: actionTypes.FETCH_CURRENCIES_CATEGORIES,
    payload: { currencies, categories }
  })

  // export const fetchCategoriesNamesSuccess = names => ({
  //   type: actionTypes.FETCH_CATEGORIES_NAMES,
  //   payload: { names }
  // })
  
  export const fetchProductsFailure = error => ({
    type: actionTypes.FETCH_PRODUCTS_FAILURE,
    payload: { error }
  });
 
  export function fetchProducts(name) {
    return dispatch => {
      dispatch(fetchProductsBegin());
      return fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_CATEGORY,
            variables: {
              category: name.toLowerCase()
            },
        }),
      
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchProductsSuccess(json.data));
          return json.data;
        })
        .catch(error => dispatch(fetchProductsFailure(error)));
    };
  }
  export function fetchCurrentProduct(name) {
    return dispatch => {
      dispatch(fetchCurrentProductBegin());
      return fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_CURRENT_PRODUCT,
            variables: {
              id: name
            },
        }),
      
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchCurrentProductSuccess(json.data.product));
          return json.data;
        })
        .catch(error => dispatch(fetchProductsFailure(error)));
    };
  }

  export function fetchCurrenciesAndCategories() {
    return dispatch => {
      dispatch(fetchProductsBegin());
      return fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_CURRENCIES_CATEGORIES,
        }),
        variables: {}
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchCurrenciesAndCategoriesNamesSuccess(json.data));
          return json.data;
        })
        .catch(error => dispatch(fetchProductsFailure(error)));
    };
  }
  // export function fetchCategoriesNames() {
  //   return dispatch => {
  //     dispatch(fetchProductsBegin());
  //     return fetch('http://localhost:4000/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         query: GET_CURRENCIES_CATEGORIES,
  //       }),
  //       variables: {}
  //     })
  //       .then(handleErrors)
  //       .then(res => res.json())
  //       .then(json => {
  //         dispatch(fetchCategoriesNamesSuccess(json.data.categories));
  //         return json.data.categories;
  //       })
  //       .catch(error => dispatch(fetchProductsFailure(error)));
  //   };
  // }
  
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;


  }