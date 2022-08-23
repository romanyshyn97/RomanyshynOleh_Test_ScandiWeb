import * as actionTypes from './types';
import { GET_CATEGORY, GET_CURRENCIES, GET_CATEGORIES_NAMES } from '../GQL/queries';

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

// export const removeFromCart = (itemID) => {
//     return {
//         type: actionTypes.REMOVE_FROM_CART,
//         payload:{
//             id: itemID
//         }
//     }
// }

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

export const loadCurrentItem = (item) => {
    return{
        type: actionTypes.LOAD_CURRENT_ITEM,
        payload: item
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
  
  export const fetchProductsSuccess = products => ({
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: { products }
  });

  export const fetchCurrenciesSuccess = currencies => ({
    type: actionTypes.FETCH_CURRENCIES,
    payload: { currencies }
  })

  export const fetchCategoriesNamesSuccess = names => ({
    type: actionTypes.FETCH_CATEGORIES_NAMES,
    payload: { names }
  })
  
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

  export function fetchCurrencies() {
    return dispatch => {
      dispatch(fetchProductsBegin());
      return fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_CURRENCIES,
        }),
        variables: {}
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchCurrenciesSuccess(json.data));
          return json.data;
        })
        .catch(error => dispatch(fetchProductsFailure(error)));
    };
  }
  export function fetchCategoriesNames() {
    return dispatch => {
      dispatch(fetchProductsBegin());
      return fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_CATEGORIES_NAMES,
        }),
        variables: {}
      })
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchCategoriesNamesSuccess(json.data.categories));
          return json.data.categories;
        })
        .catch(error => dispatch(fetchProductsFailure(error)));
    };
  }
  
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
