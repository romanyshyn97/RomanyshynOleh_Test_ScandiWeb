import { PureComponent } from "react";
import {connect} from 'react-redux';
import {increaseQTY,decreaseQTY} from '../../../redux/Shopping/actions';
import './BagItem.scss';
import plus from '../../../resources/plus.svg';
import minus from '../../../resources/minus.svg';

class BagItem extends PureComponent{
    getCartButtonClass(attr, attrValue){
        const { atr } = this.props.itemData
        if(!atr[attr.id]){
            return 
        }
    
        return atr[attr.id] === attrValue.value ? 'btn-cart-active' : 'attr-non';
    }

    isSelected(attr, attrValue){
        const { atr } = this.props.itemData
        if(!atr[attr.id]){
            return false
        }
    
        return atr[attr.id] === attrValue.value;
    }
    render(){
        const {id,name, prices, qty, gallery, attributes, atr}  = this.props.itemData;
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
                            {attributes.map(attrExist => {
                             return (
                                <>
                                {attrExist.name}
                                <div className="cart-item__left_attr">
                                    {attrExist.items.map((item, i) => {
                                        
                                        
                                        
                                        if(attrExist.type === 'text'){
                                            return( <div
                                                
                                                className={`btn-cart ${this.getCartButtonClass(attrExist,item)}`} key={item.value} 
                                            >
                                                {item.value}
                                            </div>)
                                        }
                                        else if(attrExist.type === 'swatch'){
                                            return (<div 
                                                
                                                className="btn-cart color" key={i} style={{backgroundColor: `${item.value}`, outline:this.isSelected(attrExist, item) ? '2px solid #5ECE7B' : 'none', border: 'none'}}></div>)
                                        }
                                        return <></>
                                    })}
                                </div>
                                </>
                                )
                        })}
                        </div>
                        <div className="cart-item__right">
                            <div className="cart-item__right_counter">
                                <img src={plus} alt="plus" onClick={() => onIncrease(id,qty,atr)}/>
                                    <span>{qty}</span>
                                <img src={minus} alt="minus" onClick={() => onDecrease(id,qty,atr)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(BagItem) ;