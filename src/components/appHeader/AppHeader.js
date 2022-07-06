import { PureComponent } from "react";

import Dropdown from "./currencyDropDown/CurrencyDropdown";
import Cart from "./cart/Cart";
import cart from '../../resources/cart.svg';
import logo from '../../resources/logo.svg';
import './appHeader.scss'
class AppHeader extends PureComponent{
   constructor(props){
        super(props);
        this.state = {
            opened: false
        }

        
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
                    <div onClick={this.onToggle}>
                        <img src={cart} alt="" />
                    </div>
                    
                    <div className={clazz}><Cart/></div>
                    
                </div>
            </header>
        )
    }
}

export default AppHeader;