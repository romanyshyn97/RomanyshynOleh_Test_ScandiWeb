
import React from "react";
import { PureComponent } from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";

import AppHeader from '../appHeader/AppHeader';
import ProductList from "../productsList/ProductList";
import ViewBag from "../viewBag/ViewBag";
import SingleProduct from "../singleProduct.js/SingleProduct";
import './app.css'

class App extends PureComponent {
  
  render(){

    return (
      <Router>
        <div className='app'>
          <AppHeader />
            <main>
              <Routes>
                <Route path="/" element={<ProductList/>} />
                <Route path="/cart" element={<ViewBag/>} />
                <Route path="/:id" element={<SingleProduct/>}/>
              </Routes>
              
            
            </main>
          
        </div>
      </Router>

      
    
    

  );
  }
  
}

export default App;
