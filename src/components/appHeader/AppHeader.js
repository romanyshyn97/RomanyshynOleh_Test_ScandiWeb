import { PureComponent } from "react";

import Dropdown from "./currencyDropDown/CurrencyDropdown";
import Cart from "./cart/Cart";
import cart from '../../resources/cart.svg';
import logo from '../../resources/logo.svg';
import './appHeader.scss'

import {connect} from 'react-redux';
import {Link} from "react-router-dom";


class AppHeader extends PureComponent{
   constructor(props){
        super(props);
        this.state = {
            opened: false,
            cartCount: 0
        }
        

   }

//    componentDidMount(){
//         let count = 0;
//         const {cart} = this.props;
//         cart.forEach(item => {
//             count += item.qty;
//         })
//         this.setState({
//             cartCount:count
//         })
        
//    }
   componentDidUpdate(){
    let count = 0;
        const {cart} = this.props;
        cart.forEach(item => {
            count += item.qty;
        })
        this.setState({
            cartCount:count
        })
   }

   onToggle = () => {
    this.setState({
        opened:!this.state.opened
    })
}
   
    render(){
        const clazz = this.state.opened ? 'opened': 'closed';
        
        return(
            <header className="app__header">
                <nav className="app__header__nav">
                    <ul>
                        <li>WOMEN</li>
                        <li>MEN</li>
                        <li>KIDS</li>
                    </ul>
                </nav>
                <Link to="/">
                    <img className="app__header__logo" src={logo} alt="" />
                </Link>
                
                <div className="app__header__right">
                    <Dropdown />
                    <div onClick={this.onToggle} className='cart_icon'>
                        <img src={cart} alt="" />
                        <div className="circle"><p>{this.props.cart.length}</p></div>
                    </div>
                    
                    <div className={clazz}><Cart countCart={this.state.cartCount}/></div>
                    
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.shop.cart
    }
}

export default connect(mapStateToProps)(AppHeader) ;