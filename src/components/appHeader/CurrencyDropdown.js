
import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import styled from 'styled-components';
import up from '../../resources/arrowUp.svg';
import down from '../../resources/arrowDown.svg';

import './currencyDropdown.scss'

const GET_CURRENCIES = gql`query currencies {
  currencies{
  label,
 symbol
}
}`

const DropDownContainer = styled("div")`
  
  margin: 0 auto;
  
`;

const DropDownHeader = styled("div")`
  display: flex;
  align-items:center;
  margin-bottom: 0.8em;
  cursor:pointer;
  
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

const options = ["$ USD", "€ EUR", "¥ JPY"];


class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedOption: null,
      image: down
    }
  }
 

toggling = () => {
  
  this.setState({
    isOpen: true,
    image: up
});
}

onOptionClicked = value => () => {
    
    this.setState({
      isOpen: false,
      image: down,
      selectedOption: value.slice(0,2)
    })
    console.log(this.state.selectedOption);
    };


    render(){
      const {isOpen, selectedOption, image} = this.state;
     
      
      return (
        <Query query={GET_CURRENCIES}>
          {({data,loading,error}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error...</p>

            return (
              <DropDownContainer>
              <DropDownHeader onClick={this.toggling}>
                {selectedOption || data.currencies[0].symbol}
                <img src={image} alt="" />
    
              </DropDownHeader>
              {isOpen && (
                <DropDownListContainer>
                  <DropDownList>
                    {data.currencies.map(option => (
                      <ListItem onClick={this.onOptionClicked(option.symbol)} key={Math.random()}>
                        {option.symbol}
                        {' '}
                        {option.label}
                      </ListItem>
                    ))}
                  </DropDownList>
                </DropDownListContainer>
              )}
            </DropDownContainer>
            )
          }}
        </Query>
        
     
          
        
      );

    }

 
}

export default Dropdown;


