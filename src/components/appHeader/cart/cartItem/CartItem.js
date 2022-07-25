import { PureComponent } from "react";
import product from '../../../../resources/product.png'
import './cartItem.scss'

class CartItem extends PureComponent{


    render(){
        const {name, prices, qty, gallery, attributes}  = this.props.itemData;
        const {items} = attributes[0];
        const attr = attributes[0];
        
        return(
            
                
                <div className="cart">
                    <div className="grid">
                        <div className="cart__info">
                            <h4>{name}</h4>
                            <h3>
                                {this.props.curr}
                                {prices.filter(item => item.currency.symbol === this.props.curr).map(filtered => (filtered.amount))}
                            </h3>
                            <p>{attr.name}</p>
                            <div className="sizes">
                                
                               {attr.name === 'Size' && items.map(item => (
                                    <div className="btn-cart" key={item.id} >{item.value}</div>
                               ))}
                               {attr.name === 'Color' && items.map(item => (
                                    <div className="btn-cart" key={item.id} style={{backgroundColor: `${item.displayValue}`, border:"none"}}></div>
                               ))}
                               {attr.name === 'Capacity' && items.map(item => (
                                    <div className="btn-cart" key={item.id} style={{width: "50px"}}>{item.value}</div>
                               ))}
                                   
                            </div>
                        </div>
                        <div className="cart__counter">
                            <div className="btn-cart">+</div>  
                            <span>{qty}</span>
                            <div className="btn-cart">-</div>
                        </div>
                        <div className="cart__image">
                            <img src={gallery[0]} alt="" />
                        </div>
                    </div>
                    
                </div>
           
            
        )
    }
}

export default CartItem;