import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import up from '../../../resources/arrowUp.svg';
import down from '../../../resources/arrowDown.svg';
import './CurrencyDropdown.scss'
import OutsideAlerter from "./OutsideClick";

import { fetchCurrenciesAndCategories, changeCurrency } from "../../../redux/Shopping/actions";
import { connect } from "react-redux";


class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOption: null,
      image: false,
     
    }
    this.ref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  handleClickOutside(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      this.props.onClickOutside && this.props.onClickOutside();
    }
  };
  
componentDidMount(){
  this.props.onFetchData()
  document.addEventListener('click', this.handleClickOutside, true);
  // .then(res=>console.log(res))
} 
componentWillUnmount() {
  document.removeEventListener('click', this.handleClickOutside, true);
};

onToggle = () => {
  this.setState({
    isOpen: !this.state.isOpen,
    image: !this.state.image
});
}

onOptionClicked = () => {
    this.setState({
      isOpen: false,
      image: false,
      
    })
    
    };


    render(){
      const {isOpen,  image} = this.state;
      const {currencies} = this.props.currencies;
      const imgPos = image ? up : down;
     
      return (
        <>
        <OutsideAlerter close={this.onToggle} isOpen={isOpen}>
          <div className="dropDownContainer">
              <div className="dropDownHeader" onClick={this.onToggle}>
                {this.props.selectedCurr}
                <img src={imgPos} alt="" />   
              </div>
              {isOpen && (
                <div>                 
                  <ul className="dropDownList" ref={this.ref}>
                    {currencies.map(option => (
                      <li className="listItem"
                            onClick={()=> {this.props.onSelected(option.symbol); this.onOptionClicked()}} 
                            key={uuidv4()}>
                        {option.symbol}
                        {' '}
                        {option.label}
                      </li>
                    ))}
                  </ul >
                </div>
              )}
            </div>
        </OutsideAlerter>
        
            </>
              
            )
          }
       
        
}

const mapStateToProps = state => ({
  currencies: state.shop.currencies,
  selectedCurr: state.shop.selectedCurr,
  loading: state.shop.loading,
  error: state.shop.error
});

const mapDispatchToProps = (dispatch) => {
  return{
      onFetchData: () => dispatch(fetchCurrenciesAndCategories()),
      onSelected: (curr) => dispatch(changeCurrency(curr))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dropdown);

