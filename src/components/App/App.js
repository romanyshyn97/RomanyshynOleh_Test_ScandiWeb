
import React from "react";
import { PureComponent } from "react";


import AppHeader from '../appHeader/AppHeader';
import ProductList from "../productsList/ProductList";
import './app.css'

class App extends PureComponent {
  
  render(){

    return (
      <div className='app'>
        <AppHeader />
        <ProductList />
      </div>
    
    

  );
  }
  
}

export default App;
