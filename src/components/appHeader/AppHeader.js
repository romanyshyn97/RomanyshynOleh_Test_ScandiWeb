import { PureComponent } from "react";

import Dropdown from "./currencyDropDown/CurrencyDropdown";
import Cart from "./cart/Cart";
import cart from '../../resources/cart.svg';
import logo from '../../resources/logo.svg';
import './appHeader.scss'

import {connect} from 'react-redux';


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
                <img className="app__header__logo" src={logo} alt="" />
                <div className="app__header__right">
                    <Dropdown />
                    <div onClick={this.onToggle} className='cart_image'>
                        <img src={cart} alt="" />
                        {this.props.cart.length}
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