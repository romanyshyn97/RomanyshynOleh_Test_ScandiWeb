import * as actionTypes from './shopping-types';

const INITIAL_STATE = {
    products: [
    {
        "id": "huarache-x-stussy-le",
        "name": "Nike Air Huarache Le",
        "description": "<p>Great sneakers for everyday use!</p>",
        "price": "50$"
    },
    {
        "id": "ps-5",
          "name": "PlayStation 5",
          "description": "<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>",
          "price": "450$"
    },
    {
        "id": "apple-imac-2021",
        "name": "iMac 2021",
        "description": "The new iMac!",
        "price": "770$"
    }
    ],
    cart: [],
    currentItem: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.ADD_TO_CART:
            const item = state.products.find(prod => prod.id === action.payload.id);
            const inCart = state.cart.find(item => item.id === action.payload.id ? true: false);
            return {
                ...state,
                cart: inCart 
                    ? state.cart.map(item => 
                        item.id === action.payload.id 
                        ? {...item, qty: item.qty + 1} 
                        : item) 
                    : [...state.cart, {...item, qty: 1}],
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id),
            }
        case actionTypes.ADJUST_QTY:
            return {
                ...state,
                cart: state.cart.map(item => 
                    item.id === action.payload.id 
                    ? {...item,qty: action.payload.qty} 
                    : item)
            }
        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload
            } 
        default:
            return state;   
    }
}

export default shopReducer;