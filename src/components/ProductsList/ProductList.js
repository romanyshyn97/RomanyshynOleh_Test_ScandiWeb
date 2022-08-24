import { PureComponent } from "react";
import SingleItem from "./SingleItem/SingleItem";
import './ProductList.scss'
import {connect} from 'react-redux';
import AppHeader from "../AppHeader/AppHeader";
import { fetchProducts, addToCart } from "../../redux/Shopping/actions";

class ProductList extends PureComponent{
    componentDidMount(){
        this.props.onFetchData(this.props.filter)
    }
    componentDidUpdate(prevProps){
        if(prevProps.filter !== this.props.filter){
            this.props.onFetchData(this.props.filter)
        }
    }
    render(){
        const {items, loading, error} = this.props;
        const {products} = items.category ? items.category : [];
        if(!products){
            return <></>
        } 
        return(
            
            <div>
                <h1>{items.category.name.toUpperCase()}</h1>
                <div className="grid">               
                {products.map(item => (
                    <div>
                        <SingleItem 
                            key={item.id} 
                            productData={item} 
                            filter={this.props.filter}/>
                    </div>   
                    ))} 
                </div>   
            </div>
        )
    }
}

const mapStateToProps = state => ({
    items: state.shop.items,
    selectedCurr: state.shop.selectedCurr,
    loading: state.shop.loading,
    error: state.shop.error,
    category: state.shop.category,
    cart: state.shop.cart
  });

// const mapDispatchToProps = (dispatch) => {
//     return{
//         onFetchData: () => dispatch(fetchProducts())
//     } 
// }

export default connect(mapStateToProps, {
    onFetchData: (name) => fetchProducts(name),
    addToCart: (id) => addToCart(id)
})(ProductList);