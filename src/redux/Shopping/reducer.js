import * as actionTypes from './types';

const cartStorage = JSON.parse(localStorage.getItem('cart'));

const INITIAL_STATE = {
    categoriesNames: [],
    items: [],
    currencies:[],
    loading: false,
    error: null,
    cart: cartStorage ? cartStorage.shop.cart : [],
    currentItem: null,
    selectedCurr: '$',
    totalQTY: cartStorage ? cartStorage.shop.totalQTY : 0,
    totalPRICE: cartStorage ? cartStorage.shop.totalPRICE : 0
    
}

const shopReducer = (state = INITIAL_STATE, action) => {
    let price = 0;                                  
    let count = 0;
    const countQTY = (existCart) => {
        existCart.forEach(item => {
            count += item.qty;
        })
       return count;
    }
    const countPRICE = (existCart) => {
        existCart.forEach(item => {
            price += item.qty * item.prices.filter(item => item.currency.symbol === state.selectedCurr).map(filtered => (filtered.amount));
        })
       return price;
    }
    
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
        
        case actionTypes.FETCH_CATEGORIES_NAMES:
            return{
                ...state,
                loading: false,
                categoriesNames: action.payload.names
            }
        
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
            const defaultAttr = state.currentItem.attributes.length !== 0 ? state.currentItem.attributes[0].items[0].value : false;
            const attrExist = action.payload.attr ? action.payload.attr : defaultAttr;
            const inCartSame = state.cart.find(itemExist => (itemExist.id === action.payload.id && itemExist.atr === attrExist) ? true: false);
            
            const newCart = inCartSame 
                ? state.cart.map(item => 
                (item.id === action.payload.id && item.atr === attrExist)
                    ? {...item, qty: item.qty + 1} 
                    : item)  
                : [...state.cart, {...itemExist, qty: 1, atr: attrExist}]
            
            return {
                ...state,
                cart: newCart,
                totalQTY: countQTY(newCart),
                totalPRICE: countPRICE(newCart)                                       
                
            }
        case actionTypes.SELECT_ATTRIBUTE:
            return{
                ...state,
                selectedAttr: action.payload
            }
        case actionTypes.INCREASE_QTY:
            const newCartIncr = state.cart.map(item => 
                item.id === action.payload.id && item.atr === action.payload.atrExist
                ? {...item, qty: item.qty + 1} 
                : item)
            return {
                ...state,
                cart: newCartIncr,
                totalQTY: countQTY(newCartIncr),
                totalPRICE: countPRICE(newCartIncr)
            }
        case actionTypes.DECREASE_QTY:
            
            const toRemove = state.cart.find(item => (item.id === action.payload.id && item.atr === action.payload.atrExist && item.qty  > 1) ? true: false);
            const newCartDecr = toRemove 
                ? state.cart.map(item => 
                    (item.id === action.payload.id && item.atr === action.payload.atrExist)
                    ? {...item, qty: item.qty - 1} 
                    : item)
                : state.cart.filter(item => item.id !== action.payload.id)
            return {
                ...state,
                cart: newCartDecr,
                totalQTY: countQTY(newCartDecr),
                totalPRICE: countPRICE(newCartDecr)
            }
       
        
        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload
            } 
        case actionTypes.MAKE_ORDER:
            return{
                ...state,
                cart: [],
                totalQTY: 0
                
            }
        default:
            return state;   
    }
}

export default shopReducer;