import { PureComponent } from "react";
import Dropdown from "./CurrencyDropDown/CurrencyDropdown";
import Cart from "./Cart/Cart";
import cart from '../../resources/cart.svg';
import logo from '../../resources/logo.svg';
import './AppHeader.scss'
import {connect} from 'react-redux';
import {Link, NavLink} from "react-router-dom";
import { fetchCategoriesNames } from "../../redux/Shopping/actions";

class AppHeader extends PureComponent{
   constructor(props){
        super(props);
        this.state = {
            isOpen: false,
        }
   }

   componentDidMount(){
        this.props.onFetchLabels()
   }

   onToggle = () => {
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    
    render(){
        const clazz = this.state.isOpen ? 'opened': 'closed';
        const {categoriesNames, onFilterSelected} = this.props;
        return(
            <header className="app__header">
                <nav className="app__header__nav">
                    <ul>
                        {categoriesNames.map(({name}) => {
                            const active = this.props.filter === name;
                            const clazz = active ? 'butt-active' : 'butt-non';
                            return(
                                <Link to={`/${name}`}>
                                <li 
                                    className={`${clazz}`}
                                    key={name}
                                    onClick={() => onFilterSelected(name)}
                                    >{name.toUpperCase()}
                                    
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
                        <div className="circle"><p>{this.props.totalQTY}</p></div>
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
        cart: state.shop.cart,
        totalQTY: state.shop.totalQTY,
        categoriesNames: state.shop.categoriesNames
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onFetchLabels: () => dispatch(fetchCategoriesNames())
        
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(AppHeader) ;