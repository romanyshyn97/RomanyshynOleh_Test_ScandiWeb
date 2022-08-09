import { PureComponent } from "react";
import product from '../../../resources/product.png'
import './Cart.scss'
import CartItem from "./cartItem/CartItem";
import {connect} from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import {Link} from 'react-router-dom';
import OutsideAlerter from "../currencyDropDown/OutsideClick";

import { makeOrder } from "../../../redux/Shopping/actions";

class Cart extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            total: 0,
            cartCount: 0
        }
        
   }
   componentDidUpdate(){
    let price = 0;
    let count = 0;
    const {cart} = this.props;
    cart.forEach(item => {
        price += item.qty * item.prices.filter(item => item.currency.symbol === this.props.selectedCurr).map(filtered => (filtered.amount));
        count += item.qty;
    })
    this.setState({
        total:price.toFixed(2),
        cartCount: count
    })
   }

    render(){
        const {cart, selectedCurr} = this.props;
        const {countCart} = this.props;
        const {total, cartCount} = this.state;

        
            return(
                <div>
                    
                    <div className="cart-overlay">
                        <OutsideAlerter close={this.props.close} isOpen={this.props.isOpen}>
                        <div className="cart_container">
                    {cart.length === 0 && <><div>YOUR SHOPPING CART IS EMPTY</div></>}
                    {cart.length > 0 && 
                        <> 
                            <h3>My bag, <span>{cartCount} items</span></h3>
                                <Scrollbars style={{ width: 330, height: 440 }}>
                                    {cart.map(item => (
                                        <CartItem key={item.id} itemData={item} curr={selectedCurr} />                                                                              
                                    ))}
                                </Scrollbars>
                            <div className="totalPrice">
                                <p>Total</p>
                                {selectedCurr}{total}
                            </div>
                            <div className="cart_bottom">
                                <Link to="/cart">
                                    <button className="cart_bottom_btn">VIEW BAG</button>
                                </Link>
                                
                                <button
                                    onClick={() => this.props.onMakeOrder()} 
                                    className="cart_bottom_btn">CHECK OUT</button> 
                            </div>
                        </>
                    }                                      
                    </div>
                        </OutsideAlerter>
                    
                    </div>
                </div>
               
    
            )
        
        }
        
        
}

const mapStateToProps = state =>{
    return{
        cart: state.shop.cart,
        selectedCurr: state.shop.selectedCurr
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onMakeOrder: () => dispatch(makeOrder()),
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart) ;