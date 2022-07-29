import { PureComponent } from "react";
import product from '../../../resources/product.png'
import './cart.scss'
import CartItem from "./cartItem/CartItem";
import {connect} from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import {Link} from 'react-router-dom';

class Cart extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            total: 0
        }
        
   }
   componentDidUpdate(){
    let price = 0;
    const {cart} = this.props;
    cart.forEach(item => {
        price += item.qty * item.prices.filter(item => item.currency.symbol === this.props.selectedCurr).map(filtered => (filtered.amount));
    })
    this.setState({
        total:price.toFixed(2)
    })
   }

    render(){
        const {cart, selectedCurr} = this.props;
        const {countCart} = this.props;

        
            return(
                <div>
                    
                    <div className="cart-overlay">
                    <div className="cart_container">
                    {cart.length === 0 && <><div>YOUR SHOPPING CART IS EMPTY</div></>}
                    {cart.length > 0 && 
                        <> 
                            <h3>My bag, <span>{cart.length} items</span></h3>
                                <Scrollbars style={{ width: 360, height: 440 }}>
                                    {cart.map(item => (
                                        <CartItem key={item.id} itemData={item} curr={selectedCurr} />                                                                              
                                    ))}
                                </Scrollbars>
                            <div className="totalPrice">
                                <p>Total</p>
                                {this.props.selectedCurr}{this.state.total}
                            </div>
                            <Link to="/cart">
                                <div className="view-bag">View Bag</div>
                            </Link>
                            
                            <div className="check-out">Check Out</div> 
                        </>
                    }                                      
                    </div>
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

export default connect(mapStateToProps)(Cart) ;