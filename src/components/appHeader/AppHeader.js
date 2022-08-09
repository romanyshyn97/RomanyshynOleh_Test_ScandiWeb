import { PureComponent } from "react";

import Dropdown from "./CurrencyDropDown/CurrencyDropdown";
import Cart from "./Cart/Cart";
import cart from '../../resources/cart.svg';
import logo from '../../resources/logo.svg';
import './AppHeader.scss'

import {connect} from 'react-redux';
import {Link, NavLink} from "react-router-dom";



class AppHeader extends PureComponent{
   constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            cartCount: 0,
            

        }
        

   }

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
        isOpen:!this.state.isOpen
    })
    
}
    
   
    render(){
        const clazz = this.state.isOpen ? 'opened': 'closed';
        const categories = [
            {category: 'all', label: 'ALL'},
            {category: 'tech', label: 'TECH'},
            {category: 'clothes', label: 'CLOTHES'}
        ];
        const {onFilterSelected} = this.props;
        return(
            <header className="app__header">
                <nav className="app__header__nav">
                    <ul>
                        {categories.map(({category,label}) => {
                            const active = this.props.filter === category;
                            const clazz = active ? 'butt-active' : 'butt-non';
                            return(
                                <Link to="/">
                                <li 
                                    className={`${clazz}`}
                                    key={category}
                                    onClick={() => onFilterSelected(category)}
                                    >{label}
                                    
                                </li></Link>
                                
                            )
                        })}
                        
                    </ul>
                </nav>
                <Link to="/">
                    <img className="app__header__logo" src={logo} alt="" />
                </Link>
                
                <div className="app__header__right">
                    <Dropdown />
                    <div onClick={this.onToggle} className='cart_icon'>
                        <img src={cart} alt="" />
                        <div className="circle"><p>{this.state.cartCount}</p></div>
                    </div>
                    <div className={clazz}>
                        <Cart countCart={this.state.cartCount} close={this.onToggle} isOpen={this.state.isOpen}/>
                    </div>
                    
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