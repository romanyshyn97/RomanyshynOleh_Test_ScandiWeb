import { PureComponent } from "react";
import product from '../../resources/product.png';
import cart from '../../resources/cart.svg';
import './singleProduct.scss'



class SingleProduct extends PureComponent{

    render(){


        return(
            <div className="single-item">
            
                <img src={product} alt="" />
                <div className="single-item_cart">
                    <img src={cart} alt="cart" />
                </div>
                <div className="single-item_name">
                    <h5>
                        Running Short
                    </h5>
                    <p>
                        $50.00
                    </p>
                </div>
            </div>
        )
    }
}

export default SingleProduct;