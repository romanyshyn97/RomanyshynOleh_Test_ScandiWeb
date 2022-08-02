
import React from "react";
import { PureComponent } from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";

import AppHeader from '../appHeader/AppHeader';
import ProductList from "../productsList/ProductList";
import ViewBag from "../viewBag/ViewBag";
import SingleProduct from "../singleProduct.js/SingleProduct";
import './app.css'

class App extends PureComponent {
    constructor(props){
      super(props);
      this.state = {
        filter: 'all'
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
                <Route path="/:category" element={<ProductList filter={this.state.filter}/>} />
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
