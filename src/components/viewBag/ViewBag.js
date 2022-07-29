import { PureComponent } from "react";
import BagItems from "./bagItems.js/BagItems";

import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import './viewBag.scss';
class ViewBag extends PureComponent{


    render(){
        const {cart, selectedCurr} = this.props;

        return(
            <div className="bag-page">
                <h1>CART</h1>
                {cart.length === 0 && <Link to="/" className="back">SHOPPING CART IS EMPTY . BACK TO MAIN PAGE</Link>}
                {cart.length > 0 && cart.map(item => (
                    <BagItems key={item.id} itemData={item} curr={selectedCurr} />                                                                              
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
