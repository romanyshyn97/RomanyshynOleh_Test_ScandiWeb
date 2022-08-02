import { PureComponent } from "react";
import React from "react";
import './singleItem.scss';


import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import { loadCurrentItem } from "../../../redux/Shopping/actions";

class SingleItem extends PureComponent{
   


    render(){
        const {id,name, inStock,gallery, prices, brand} = this.props.productData;
        const {cart} = this.props;
        
        return(
            <div className="single-item" key={id}>
                {inStock && 
                
                <div >
                <Link to={`/${this.props.filter}/${id}`}
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
                        {/* {prices.map(item => <div>{item.currency.filter(item=> item.symbol)} {item.amount}</div>)} */}
                        {this.props.selectedCurr}
                        {prices.filter(item => item.currency.symbol === this.props.selectedCurr).map(filtered => (filtered.amount))}
                    </div>                                                                                       
                </div>
            </div>
        }
        {!inStock && 
                
                <div className="inStock" >
                    <h1>OUT OF STOCK</h1>
                <Link to={`/${this.props.filter}/${id}`}
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
                        {/* {prices.map(item => <div>{item.currency.filter(item=> item.symbol)} {item.amount}</div>)} */}
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem) ;