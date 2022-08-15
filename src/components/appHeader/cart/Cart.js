import { PureComponent } from "react";
import product from '../../../resources/product.png'
import './Cart.scss'
import CartItem from "./CartItem/CartItem";
import {connect} from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import {Link} from 'react-router-dom';
import OutsideAlerter from "../CurrencyDropDown/OutsideClick";

import { makeOrder } from "../../../redux/Shopping/actions";

class Cart extends PureComponent{

    render(){
        const {cart, selectedCurr, totalPRICE, totalQTY} = this.props;
            return(
                <div>
                    <div className="cart-overlay">
                        <OutsideAlerter close={this.props.close} isOpen={this.props.isOpen}>
                        <div className="cart_container">
                    {cart.length === 0 && <><div>YOUR SHOPPING CART IS EMPTY</div></>}
                    {cart.length > 0 && 
                        <> 
                            <h3>My bag, <span>{totalQTY} items</span></h3>
                                <Scrollbars style={{ width: 330, height: 440 }}>
                                    {cart.map(item => (
                                        <CartItem key={item.id} itemData={item} curr={selectedCurr} />                                                                              
                                    ))}
                                </Scrollbars>
                            <div className="totalPrice">
                                <p>Total</p>
                                {selectedCurr}{totalPRICE.toFixed(2)}
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
        selectedCurr: state.shop.selectedCurr,
        totalQTY: state.shop.totalQTY,
        totalPRICE: state.shop.totalPRICE
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onMakeOrder: () => dispatch(makeOrder()),
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart) ;