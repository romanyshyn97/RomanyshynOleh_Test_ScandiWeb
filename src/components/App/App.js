
import React from "react";



import AppHeader from '../appHeader/AppHeader';
import ProductList from "../productsList/ProductList";
import './app.css'

function App() {
  return (
      <div className='app'>
        <AppHeader/>
        <ProductList/>
      </div>
    
    

  );
}

export default App;
