import { PureComponent } from "react";
import BagItems from "./bagItems.js/BagItems";

import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import './viewBag.scss';
class ViewBag extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            total: 0,
            cartCount: 0
        }
        
   }
   componentDidUpdate(){
    let price = 0;
    let count = 0;
    const {cart} = this.props;
    cart.forEach(item => {
        price += item.qty * item.prices.filter(item => item.currency.symbol === this.props.selectedCurr).map(filtered => (filtered.amount));
        count += item.qty;
    })
    this.setState({
        total:price.toFixed(2),
        cartCount:count
    })
    
   }
   
        
        

    render(){
        const {cart, selectedCurr} = this.props;

        return(
            <div className="bag-page">
                <h1>CART</h1>
                {cart.length === 0 && <Link to="/" className="back">SHOPPING CART IS EMPTY . BACK TO MAIN PAGE</Link>}
                {cart.length > 0 && cart.map(item => (
                    <div>
                        <BagItems key={item.id} itemData={item} curr={selectedCurr} />
                        <div className="summary">
                            <h4>Tax 21% : </h4>
                            <h3>{this.props.selectedCurr}{' '}{((this.state.total) * 0.21).toFixed(2)}</h3>
                            <h4>Quantity: </h4>
                            <h3>{this.state.cartCount}</h3>
                            <h4>Total:</h4>
                            <h3> {this.props.selectedCurr}{' '}{this.state.total}</h3>
                        </div>
                        
                    </div>
                                                                                                 
                ))}
               
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

export default connect(mapStateToProps)(ViewBag) ;
