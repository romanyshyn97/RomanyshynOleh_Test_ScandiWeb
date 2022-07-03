

import { Component } from "react";
import styled from 'styled-components';
import up from '../../resources/arrowUp.svg';
import down from '../../resources/arrowDown.svg';

import './currencyDropdown.scss'



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
        
        <DropDownContainer>
          <DropDownHeader onClick={this.toggling}>
            {selectedOption || "$"}
            <img src={image} alt="" />

          </DropDownHeader>
          {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                {options.map(option => (
                  <ListItem onClick={this.onOptionClicked(option)} key={Math.random()}>
                    {option}
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>
          )}
        </DropDownContainer>
     
          
        
      );

    }

 
}

export default Dropdown;