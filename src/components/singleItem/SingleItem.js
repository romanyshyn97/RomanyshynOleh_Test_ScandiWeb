import { PureComponent } from "react";
import React from "react";
import './singleItem.scss';
import cart from '../../resources/cart-white.svg';


class SingleItem extends PureComponent{
   


    render(){
        const {id, name, gallery, prices} = this.props;
        return(
            <div className="single-item" key={id}>
                <div className="single-item_image">
                    <img src={gallery} alt={name} />
                </div>
                <div className="single-item_cart">
                    <img src={cart} alt="cart" />
                </div>
                <div className="single-item_name">
                    <h5>
                        {name}
                    </h5>
                    <p>
                    {prices.map(item => <div>{item.currency.symbol} {item.amount}</div>)}
                        
                        
                    </p>
                </div>
            </div>
        )
    }
}

export default SingleItem;