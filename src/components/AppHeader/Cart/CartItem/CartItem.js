import { PureComponent } from "react";
import './CartItem.scss'
import { connect } from "react-redux";
import { decreaseQTY, increaseQTY } from "../../../../redux/Shopping/actions";
import plus from '../../../../resources/plus.svg';
import minus from '../../../../resources/minus.svg';
class CartItem extends PureComponent{

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
        const {id,name,brand, prices, qty, gallery, atr, attributes}  = this.props.itemData;
        // const attr = attributes[0];
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
                            {attributes.map(attrExist => {
                             return (
                                <>
                                {attrExist.name}
                                <div className="flex-attr">
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