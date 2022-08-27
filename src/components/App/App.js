import React from "react";
import { PureComponent } from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";

import AppHeader from '../AppHeader/AppHeader';
import ProductList from "../ProductsList/ProductList";
import ViewBag from "../ViewBag/ViewBag";
import SingleProduct from "../SingleProduct/SingleProduct";
import './App.css'

class App extends PureComponent {
    constructor(props){
      super(props);
      this.state = {
        filter: ''
      }
    }
    onFilterSelected = (name) => {
      this.setState({
          filter: name
      })
     
  }
  render(){

    return (
      <Router>
        <div className='app'>
        <AppHeader onFilterSelected={this.onFilterSelected} filter={this.state.filter}/>
            <main>
            <Routes>
                <Route path="/:name" element={<ProductList filter={this.state.filter}/>} />
                <Route path="/cart" element={<ViewBag/>} />
                <Route path="/:category/:id" element={<SingleProduct />}/>
              </Routes>
            </main>
          
          
        </div>
      </Router>

      
    
    

  );
  }
  
}

export default App;
