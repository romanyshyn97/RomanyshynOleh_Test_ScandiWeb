import { PureComponent } from "react";
import product from '../../../resources/product.png'
import './cart.scss'
import CartItem from "./cartItem/CartItem";
import {connect} from 'react-redux';

class Cart extends PureComponent{

    render(){
        const {cart} = this.props;
        return(
            <div className="cart-overlay">
                {cart.map(item => (
                    <CartItem key={item.id} itemData={item} countCart={this.props.countCart}/>
                ))}
                
            </div>

        )
    }
}

const mapStateToProps = state =>{
    return{
        cart: state.shop.cart
    }
}

export default connect(mapStateToProps)(Cart) ;