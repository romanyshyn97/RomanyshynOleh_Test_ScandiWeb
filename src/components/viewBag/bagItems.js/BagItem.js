import { PureComponent } from "react";

import {connect} from 'react-redux';
import {increaseQTY,decreaseQTY} from '../../../redux/Shopping/actions';
import './BagItem.scss';
import plus from '../../../resources/plus.svg';
import minus from '../../../resources/minus.svg';
class BagItems extends PureComponent{


    render(){
        const {id,name, prices, qty, gallery, attributes, atr}  = this.props.itemData;
        
        const attr = attributes[0];
        const {onIncrease, onDecrease} = this.props;
        return(
            <div className="cart-item">
                    <div className="cart-item__grid">
                        <div className="cart-item__left">
                            <h4>{name}</h4>
                            <h3>
                                {this.props.curr}
                                {prices.filter(item => item.currency.symbol === this.props.curr).map(filtered => (filtered.amount))}
                            </h3>
                            {attr ? <>
                                <p>{attr.name}</p>
                                <div className="cart-item__left_attr">
                                    
                                {attr.name === 'Size' && attr.items.map(item => {
                                        const active = atr === item.value;
                                        const clazz = active ? 'btn-cart-active' : 'btn-cart';
                                        return(
                                            <div className={`btn-cart ${clazz}`} key={item.id} >{item.value}</div>
                                        )
                                        })}
                                {attr.name === 'Color' && attr.items.map(item => (
                                        <div className="btn-cart" key={item.id} style={{backgroundColor: `${item.displayValue}`, border:"none"}}></div>
                                ))}
                                {attr.name === 'Capacity' && attr.items.map(item => (
                                        <div className="btn-cart" key={item.id} style={{width: "50px"}}>{item.value}</div>
                                ))}
                                    
                                </div>
                            </> : <></>}
                        </div>
                        <div className="cart-item__right">
                            <div className="cart-item__right_counter">
                                <img src={plus} alt="plus" onClick={() => onIncrease(id,qty,atr)}/>
                                    <span>{qty}</span>
                                <img src={minus} alt="minus" onClick={() => onDecrease(id,qty,atr)}/>
                                {/* <div className="btn-cart_counter" onClick={() => this.props.onIncrease(id,qty)} >+</div>  
                                
                                <div className="btn-cart_counter" onClick={() => this.props.onDecrease(id,qty)}>-</div> */}
                            </div>
                            <div className="cart-item__right_image">
                                <img src={gallery[0]} alt="" />
                            </div>
                        </div>
                        
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
const mapDispatchToProps = (dispatch) => {
    return{
        onIncrease: (id,qty,attrExist) => dispatch(increaseQTY(id,qty,attrExist)),
        onDecrease: (id,qty,attrExist) => dispatch(decreaseQTY(id,qty,attrExist))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(BagItems) ;