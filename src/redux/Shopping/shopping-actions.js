import * as actionTypes from './shopping-types';
import Service from '../../service/Service';


const dataService = new Service();

export const addToCart = (itemID) => {
    return{
        type: actionTypes.ADD_TO_CART,
        payload: {
            id:itemID
        }
    }
}

export const removeFromCart = (itemID) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload:{
            id: itemID
        }
    }
}

export const adjustQTY = (itemID, value) => {
    return {
        type: actionTypes.ADJUST_QTY,
        payload:{
            id: itemID,
            qty: value,
        }
    }
}

export const loadCurrentItem = (item) => {
    return{
        type: actionTypes.LOAD_CURRENT_ITEM,
        payload: item
    }
}

// export const fetchData = () => {
//     return async (dispatch) => {
//         return await dataService.categoryRequest()
//             .then(json => dispatch(
//                 {type: actionTypes.FETCH_DATA, data: json}
//             ))
//             .then(res => res.data.data)
//             .catch(err => dispatch(
//                 {type: actionTypes.ERROR, msg: "ERROR"}
//             ))
//     }
// }

export const fetchProductsBegin = () => ({
    type: actionTypes.FETCH_PRODUCTS_BEGIN
  });
  
  export const fetchProductsSuccess = products => ({
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: { products }
  });
  
  export const fetchProductsFailure = error => ({
    type: actionTypes.FETCH_PRODUCTS_FAILURE,
    payload: { error }
  });

  export function fetchProducts() {
    return dispatch => {
      dispatch(fetchProductsBegin());
      return fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: ` query category {
            category(input:{title:"all"}){
                 name,
              products{
                id,
                name,
                description,
                gallery,
                prices{
                  currency{symbol},
                  amount
                }
              }
            }
            }`,
        }),
        variables: {}
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
  
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }



// export const fetchData = () => {
//     return async (dispatch) => {
//     return await fetch('http://localhost:4000/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           query: ` query category {
//             category(input:{title:"all"}){
//                  name,
//               products{
//                 id,
//                 name,
//                 description,
//                 gallery,
//                 prices{
//                   currency{symbol},
//                   amount
//                 }
//               }
//             }
//             }`,
//         }),
//         variables: {}
//       })
//         .then((res) => res.json())
//         .then(json => dispatch(
//             { type: "FetchData", data: json }))
//         .catch(err => dispatch(
//             { type: "ERROR",msg: "Unable to fetch data" }))
//         .then(res => res.data.data)
// }
// }