import { PureComponent } from "react";

import Dropdown from "./CurrencyDropdown";
import cart from '../../resources/cart.svg';
import logo from '../../resources/logo.svg';
import './appHeader.scss'
class AppHeader extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            currencies: [
                {
                    id: 0,
                    title: '$',
                    selected: false,
                    key: 'location'
                },
                {
                    id: 1,
                    title: '€',
                    selected: false,
                    key: 'location'
                },
                {
                    id: 2,
                    title: '¥',
                    selected: false,
                    key: 'location'
                }]
        }
    }
    resetThenSet = (id, key) => {
        const temp = [...this.state[key]];
      
        temp.forEach((item) => item.selected = false);
        temp[id].selected = true;
      
        this.setState({
          [key]: temp,
        });
      }
      
    render(){
        
        // const options = [
        //     { value: 'usd', label: '$ USD' },
        //     { value: 'eur', label: '€ EUR' },
        //     { value: 'jpy', label: '¥ JPY' },
        //   ]
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
              
                    <img src={cart} alt="" />
                </div>
            </header>
        )
    }
}

export default AppHeader;