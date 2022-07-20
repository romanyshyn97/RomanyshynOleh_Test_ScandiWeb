import { PureComponent } from "react";
import product from '../../../../resources/product.png'

class CartItem extends PureComponent{


    render(){
        const {name, price, qty, gallery}  = this.props.itemData;
        return(
            <div className="cart">
                    <h3>My bag, <span>{this.props.countCart} items</span></h3>
                    <div className="grid">
                    <div className="left">
                        <h4>{name}</h4>
                        <h3>{price}</h3>
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
                        <span>{qty}</span>
                        <button>-</button>
                    </div>
                    <div className="right">
                        <img src={gallery} alt="" />
                    </div>
                    </div>
                    
                </div>
        )
    }
}

export default CartItem;