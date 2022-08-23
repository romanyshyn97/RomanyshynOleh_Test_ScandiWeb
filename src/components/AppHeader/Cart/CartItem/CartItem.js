import { PureComponent } from "react";
import './CartItem.scss'
import { connect } from "react-redux";
import { decreaseQTY, increaseQTY } from "../../../../redux/Shopping/actions";
import plus from '../../../../resources/plus.svg';
import minus from '../../../../resources/minus.svg';
class CartItem extends PureComponent{

    getCartButtonClass(attribute, selectedAttribute){
        return selectedAttribute === attribute.value ? 'btn-cart-active' : 'btn-cart';
    }

    render(){
        const {id,name,brand, prices, qty, gallery, atr, attributes}  = this.props.itemData;
        const attr = attributes[0];
        const {curr, onIncrease, onDecrease} = this.props;
        return( 
                <div className="cart">
                    <div className="grid">
                        <div className="cart__info">
                            <h4>{brand}<br/>{name}</h4>
                            <h3>
                                {curr}
                                {prices.filter(item => item.currency.symbol === curr).map(filtered => (filtered.amount))}
                            </h3>
                            {attr ? <div>
                                <p>{attr.name}</p>
                            <div className="sizes">
                               {attr.name === 'Size' && attr.items.map(item => {
                                    // const active = atr === item.value;
                                    // const clazz = active ? 'btn-cart-active' : 'btn-cart';
                                    return(
                                        <div className={`btn-cart ${this.getCartButtonClass(item, atr)}`} key={item.id} >{item.value}</div>
                                    )   
                               })}
                               {attr.name === 'Color' && attr.items.map(item => {
                                    // const active = atr === item.value;
                                    // const clazz = active ? 'btn-cart-border' : 'btn-cart';
                                        return(
                                            <div className={`btn-cart ${this.getCartButtonClass(item, atr)}`} key={item.id} style={{backgroundColor: `${item.displayValue}`, border:"none"}}></div>
                                        )
                                })}
                               {attr.name === 'Capacity' && attr.items.map(item => {
                                    // const active = atr === item.value;
                                    // const clazz = active ? 'btn-cart-active' : 'btn-cart';
                                    return(
                                        <div className={`btn-cart ${this.getCartButtonClass(item, atr)}`} key={item.id} style={{width: "50px"}}>{item.value}</div>
                                    )
                               })}
                                   
                            </div> 
                            </div> : <></>
                            }
                        </div>
                        <div className="cart__counter">
                            <img src={plus} alt="plus" onClick={() => onIncrease(id,qty,atr)}/>
                                <span>{qty}</span>
                            <img src={minus} alt="minus" onClick={() => onDecrease(id,qty, atr)}/>
                        </div>
                        <div className="cart__image">
                            <img src={gallery[0]} alt="" />
                        </div>
                    </div>
                    
                </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        cart: state.shop.cart,
        selectedCurr: state.shop.selectedCurr,
        selectedAttr: state.shop.selectedAttr
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        onIncrease: (id,qty,atrname) => dispatch(increaseQTY(id,qty,atrname)),
        onDecrease: (id,qty,atrname) => dispatch(decreaseQTY(id,qty,atrname))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CartItem) ;