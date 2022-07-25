import { PureComponent } from "react";
import product from '../../../resources/product.png'
import './cart.scss'
import CartItem from "./cartItem/CartItem";
import {connect} from 'react-redux';

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
        
        
        console.log(cart)
        cart.forEach(item => {
            price += item.qty * item.prices.filter(item => item.currency.symbol === this.props.selectedCurr).map(filtered => (filtered.amount));
        })
        this.setState({
            total:price.toFixed(2)
        })
   }

    render(){
        const {cart, selectedCurr} = this.props;
        return(
            <div className="cart-overlay">
                <div className="cart_container">
                <h3>My bag, <span>{this.props.countCart} items</span></h3>
                {cart.map(item => (
                    <CartItem key={item.id} itemData={item} curr={selectedCurr} />
                ))}
                <div className="totalPrice">
                    <p>Total</p>
                    {this.props.selectedCurr}{this.state.total}
                </div>
                <div>View Bag</div>
                <div>Check Out</div>
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