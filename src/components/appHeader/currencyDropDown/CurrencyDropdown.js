import React, { Component } from "react";

import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import up from '../../../resources/arrowUp.svg';
import down from '../../../resources/arrowDown.svg';
import './currencyDropdown.scss'

import Service from "../../../service/Service";

import { fetchCurrencies, changeCurrency } from "../../../redux/Shopping/actions";
import { connect } from "react-redux";


const DropDownContainer = styled("div")`
  
  margin: 0 auto;
  
`;

const DropDownHeader = styled("div")`
  display: flex;
  align-items:center;
  margin-bottom: 0.8em;
  cursor:pointer;
  width: 100px;
  font-weight: 550;
  font-size: 1.3rem;
  color: black;
  background: #ffffff;
  img{
    width: 15px;
  }
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  position:absolute;
  z-index: 5;
  background: #ffffff;
  filter: drop-shadow(0 0 0.75rem #EEEEEE);
  
  color: black;
  font-size: 1.3rem;
  font-weight: 550;
  
`;

const ListItem = styled("li")`
  list-style: none;
  padding: 1em;
  transition: all 0.1s;
  &:hover{
    background-color: #EEEEEE;
    transition: all 0.1s;
    cursor:pointer
  }
`;




class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOption: null,
      image: false,
     
    }
  }
  
componentDidMount(){
  this.props.onFetchData()
  // .then(res=>console.log(res))
} 

toggling = () => {
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
      const {isOpen, selectedOption, image} = this.state;
      const {currencies} = this.props.currencies;
      const imgPos = image ? up : down;
     
      return (
        <>
        <DropDownContainer>
              <DropDownHeader onClick={this.toggling}>
                {this.props.selectedCurr}
                <img src={imgPos} alt="" />
    
              </DropDownHeader>
              {isOpen && (
                <DropDownListContainer>
                  <DropDownList>
                    {currencies.map(option => (
                      <ListItem 
                            onClick={()=> {this.props.onSelected(option.symbol); this.onOptionClicked()}} 
                            key={uuidv4()}>
                        {option.symbol}
                        {' '}
                        {option.label}
                      </ListItem>
                    ))}
                  </DropDownList>
                </DropDownListContainer>
              )}
            </DropDownContainer>
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
      onFetchData: () => dispatch(fetchCurrencies()),
      onSelected: (curr) => dispatch(changeCurrency(curr))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dropdown);


