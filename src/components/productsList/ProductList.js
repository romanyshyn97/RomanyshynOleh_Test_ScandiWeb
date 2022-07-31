import { PureComponent } from "react";
import SingleItem from "./singleItem/SingleItem";
import { v4 as uuidv4 } from 'uuid';
import './productList.scss'

import {connect} from 'react-redux';


import Service from "../../service/Service";
import { fetchProducts } from "../../redux/Shopping/actions";

class ProductList extends PureComponent{

    
    componentDidMount(){
        this.props.onFetchData(this.props.filter)
        // .then(res => console.log(res))
        console.log(this.props.filter)
            
    }
    componentDidUpdate(prevProps){
        if(prevProps.filter !== this.props.filter){
            this.props.onFetchData(this.props.filter)
        }
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.pokemons !== this.state.pokemons) {
    //       console.log('pokemons state has changed.')
    //     }
    //   }

    render(){
        
        const {items, loading, error} = this.props;
        const {products} = items.category ? items.category : [];
        if(!products){
            return <></>
        } 
        // console.log(items)
        return(
            <main>
                <h1>{items.category.name.toUpperCase()}</h1>
                <div className="grid">
                
                {products.map(item => (
                        <SingleItem key={item.id} productData={item} />
                    ))}
                    
                    
                </div>   
            </main>
            
        )
    }
}

const mapStateToProps = state => ({
    items: state.shop.items,
    selectedCurr: state.shop.selectedCurr,
    loading: state.shop.loading,
    error: state.shop.error,
    category: state.shop.category
  });

// const mapDispatchToProps = (dispatch) => {
//     return{
//         onFetchData: () => dispatch(fetchProducts())
//     } 
// }

export default connect(mapStateToProps, {
    onFetchData: (name) => fetchProducts(name)
})(ProductList);