import { PureComponent } from "react";
import React from "react";
import './SingleItem.scss';
import cartIcon from '../../../resources/cart-white.svg'
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import { loadCurrentItem , addToCart} from "../../../redux/Shopping/actions";

class SingleItem extends PureComponent{
    render(){
        const {id,name, inStock,gallery, prices, brand, category} = this.props.productData;
        const {cart} = this.props;
        return(
            <div className="single-item" key={id}>
                {inStock && 
                <><Link to={`/${category}/${id}`}>
                <div onClick={() => this.props.loadCurrentItem(this.props.productData)}>
                <div 
                    className="single-item_image"
                    >
                    <img src={gallery[0]} alt="" />
                </div>
                <div className="single-item_name">
                    <h5>
                        {brand}<br/>
                        {name}
                    </h5>
                    <div>
                        {this.props.selectedCurr}
                        {prices.filter(item => item.currency.symbol === this.props.selectedCurr).map(filtered => (filtered.amount))}
                    </div>                                                                                      
                </div>
            </div>
            </Link>
            <div
                onClick={() => {this.props.loadCurrentItem(this.props.productData);this.props.addToCart(id) }} 
                className='single-item_cartIcon'>
                <img src={cartIcon} alt="cart" />
            </div></>
        }
        {!inStock && 
                <div className="inStock" >
                    <h1>OUT OF STOCK</h1>
                <Link to={`/${category}/${id}`}
                    onClick={() => this.props.loadCurrentItem(this.props.productData)}
                    className="single-item_image">
                    <img src={gallery[0]} alt={name} />
                </Link>
                <div className="single-item_name">
                    <h5>
                        {brand}<br/>
                        {name}
                    </h5>
                    <div>
                        {this.props.selectedCurr}
                        {prices.filter(item => item.currency.symbol === this.props.selectedCurr).map(filtered => (filtered.amount))}
                        
                    </div>                                                                                       
                </div>
            </div>
        }
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return{
        cart: state.shop.cart,
        selectedCurr: state.shop.selectedCurr
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
        addToCart: (id) => dispatch(addToCart(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem) ;