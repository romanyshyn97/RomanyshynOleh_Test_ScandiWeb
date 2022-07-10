import { PureComponent } from "react";
import React from "react";
import './singleItem.scss';
import cart from '../../resources/cart-white.svg';


class SingleItem extends PureComponent{
   


    render(){
        const {id, name, gallery} = this.props;
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
                        $50.00
                    </p>
                </div>
            </div>
        )
    }
}

export default SingleItem;