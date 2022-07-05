import { Component } from "react";
import SingleProduct from "../singleProduct/SingleProduct";
import './productList.scss'


class ProductList extends Component{
    render(){

        return(
            <div>
                <h1>Category name</h1>
                <div className="list">
                    <SingleProduct/>
                    <SingleProduct/>
                    <SingleProduct/>
                </div>
                
            </div>
            
        )
    }
}

export default ProductList;