import { PureComponent } from "react";
import React from "react";
import './singleItem.scss';
import cart from '../../resources/cart-white.svg';
import image from '../../resources/product.png'

import {connect} from 'react-redux'
import { addToCart } from "../../redux/Shopping/shopping-actions";

class SingleItem extends PureComponent{
   


    render(){
        const {id,name, gallery, price} = this.props.productData;
        
        return(
            <div className="single-item" key={id}>
                <div className="single-item_image">
                    <img src={gallery} alt={name} />
                </div>
                <div 
                    onClick={()=> this.props.addToCart(id)}
                    className="single-item_cart">
                    <img src={cart} alt="cart" />
                </div>
                <div className="single-item_name">
                    <h5>
                        {name}
                    </h5>
                    <div>{price}</div>
                    {/* {prices.map(item => <div>{item.currency.symbol} {item.amount}</div>)} */}
                        
                        
                    
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (id) => dispatch(addToCart(id))
    }
}

export default connect(null, mapDispatchToProps)(SingleItem) ;