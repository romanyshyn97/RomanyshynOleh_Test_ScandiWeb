import * as actionTypes from './types';
import store from '../store';
import { totalQTY } from './actions';
const cartStorage = JSON.parse(localStorage.getItem('cart'));

const INITIAL_STATE = {
    items: [],
    currencies:[],
    loading: false,
    error: null,
    cart: cartStorage ? cartStorage.shop.cart : [],
    currentItem: null,
    selectedCurr: '$',
    totalQTY: cartStorage ,
    totalPRICE: cartStorage 
    
}
// if (localStorage.getItem('cart')) {
// 	INITIAL_STATE.cart = JSON.parse(localStorage.getItem('cart'));
// } else {
// 	INITIAL_STATE.cart = [];
// }

const shopReducer = (state = INITIAL_STATE, action) => {
    // let price = 0;                                   ////// 2 функції які вертають кількість та тотал
    // let count = 0;
    // const countQTY = (existCart) => {
    //     existCart.forEach(item => {
    //         count += item.qty;
    //     })
    //    return count;
    // }
    // const countPRICE = (existCart) => {
    //     existCart.forEach(item => {
    //         price += item.qty * item.prices.filter(item => item.currency.symbol === state.selectedCurr).map(filtered => (filtered.amount));
    //     })
    //    return price;
    // }
    
    
    
    switch(action.type){
        case actionTypes.FETCH_PRODUCTS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.products
            };
        
        case actionTypes.FETCH_CURRENCIES:
            return {
                ...state,
                loading: false,
                currencies: action.payload.currencies
            };
        
        case actionTypes.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };
        case actionTypes.CHANGE_CURRENCY:
            return{
                ...state,
                selectedCurr: action.payload
            }
        case actionTypes.ADD_TO_CART:
            const itemExist = state.items.category.products.find(prod => prod.id === action.payload.id);
            const inCartSame = state.cart.find(itemExist => (itemExist.id === action.payload.id && itemExist.atr === action.payload.attr) ? true: false);
            
            return {
                ...state,
                cart: inCartSame 
                    ? state.cart.map(item => 
                    (item.id === action.payload.id && item.atr === action.payload.attr)
                        ? {...item, qty: item.qty + 1} 
                        : item) 
                            
                    : [...state.cart, {...itemExist, qty: 1, atr: action.payload.attr }],
                // totalQTY: countQTY(state.cart),
                // totalPRICE: countPRICE(state.cart) /////////// викликаю з необхідним кошиком

                        
                

                
            }
        case actionTypes.SELECT_ATTRIBUTE:
            return{
                ...state,
                selectedAttr: action.payload
            }
        // case actionTypes.REMOVE_FROM_CART:
        //     return {
        //         ...state,
        //         cart: state.cart.filter(item => item.id !== action.payload.id),
        //     }


        case actionTypes.INCREASE_QTY:
            
            return {
                ...state,
                cart: state.cart.map(item => 
                    item.id === action.payload.id && item.atr === action.payload.atrExist
                    ? {...item, qty: item.qty + 1} 
                    : item),
                totalQTY: 0,
                totalPRICE: 0
            }
        case actionTypes.DECREASE_QTY:
            
            const toRemove = state.cart.find(item => (item.id === action.payload.id && item.atr === action.payload.atrExist && item.qty  > 1) ? true: false);
            return {
                ...state,
                cart: toRemove ?
                        state.cart.map(item => 
                        (item.id === action.payload.id && item.atr === action.payload.atrExist)
                        ? {...item, qty: item.qty - 1} 
                        : item)
                    : state.cart.filter(item => item.id !== action.payload.id),
                totalQTY: 0,
                totalPRICE: 0
            }
       
        
        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload
            } 
        case actionTypes.MAKE_ORDER:
            return{
                ...state,
                cart: []
            }
        default:
            return state;   
    }
}

export default shopReducer;