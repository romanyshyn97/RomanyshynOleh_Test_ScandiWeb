import { PureComponent } from "react";
import product from '../../../resources/product.png'
import './cart.scss'

class Cart extends PureComponent{

    render(){

        return(
            <div className="cart-overlay">
                <div className="cart">
                    <h3>My bag, <span>1 items</span></h3>
                    <div className="grid">
                    <div className="left">
                        <h4>Apollo running short</h4>
                        <h3>$50.00</h3>
                        <p>Size:</p>
                        <div className="sizes">
                            <button>XS</button>
                            <button>S</button>
                            <button>M</button>
                            <button>L</button>    
                        </div>
                        <p>Color:</p> 
                        <div>
                            <button></button>
                        </div>
                    </div>
                    <div className="center">
                        <button>+</button>  
                        <span>1</span>
                        <button>-</button>
                    </div>
                    <div className="right">
                        <img src={product} alt="" />
                    </div>
                    </div>
                    
                </div>
            </div>

        )
    }
}

export default Cart;