import { PureComponent } from "react";
import BagItem from "./BagItem/BagItem";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import './ViewBag.scss';
import {makeOrder} from '../../redux/Shopping/actions'

class ViewBag extends PureComponent{

    render(){
        const {cart, selectedCurr, totalPRICE, totalQTY} = this.props;
        return(
            <div className="bag-page">
                <h1>CART</h1>
                {cart.length === 0 && <Link to="/" className="back">SHOPPING CART IS EMPTY . BACK TO MAIN PAGE</Link>}
                {cart.length > 0 && 
                <div>
                    {cart.map((item,i) => (
                    <div>
                        <BagItem key={i} itemData={item} curr={selectedCurr} />
                    </div>                                                                            
                ))}
                    <div className="summary">
                        <h4>Tax 21% : </h4>
                        <h3>{selectedCurr}{' '}{((totalPRICE) * 0.21).toFixed(2)}</h3>
                        <h4>Quantity: </h4>
                        <h3>{totalQTY}</h3>
                        <h4>Total:</h4>
                        <h3> {selectedCurr}{' '}{totalPRICE.toFixed(2)}</h3>
                    </div>
                    <button className="single-product__info_add" onClick={() => this.props.onMakeOrder()}>ORDER</button>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        cart: state.shop.cart,
        selectedCurr: state.shop.selectedCurr,
        totalPRICE: state.shop.totalPRICE,
        totalQTY: state.shop.totalQTY
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onMakeOrder: () => dispatch(makeOrder()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewBag) ;
