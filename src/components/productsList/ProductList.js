// import { PureComponent } from "react";
// import SingleItem from "../singleItem/SingleItem";
// import { v4 as uuidv4 } from 'uuid';
// import './productList.scss'
// // import gql from "graphql-tag";
// import './productList.scss';

// import Service from "../../service/Service";

// class ProductList extends PureComponent{
//     constructor(props){
//         super(props);
//         this.state = {
//             list: [],
//             prices: [],
//             category: ''
//         }
//     }

//     Service = new Service();

//     componentDidMount(){
//         this.onRequest()
//       } 

//     onRequest = () => {
//         this.Service.categoryRequest()
//             .then(this.onLoaded)
//             // .then(res => console.log(res.data.category.products))
            
          
//       }
    
//     onLoaded = (res) => {
        
//     this.setState({
//         list: res.data.category.products,
//         category: res.data.category.name,
       

//     })
//     }
    
//     render(){
//         const {list, category, prices} = this.state;
//         const {amount} = prices;
//         console.log(amount)
//         return(
//             <main>
                
//                 <h1>{category.toUpperCase()}</h1>
//                 <div className="grid">
//                     {list.map(({name, gallery, id, prices }) => (
                        
//                         <SingleItem 
//                             name={name}
//                             gallery={gallery}
//                             prices={prices}
//                             id={id} key={uuidv4()}/>
//                     ))}
//                 </div>   
//             </main>
            
//         )
//     }
// }

// export default ProductList;


import { PureComponent } from "react";
import SingleItem from "./singleItem/SingleItem";
import { v4 as uuidv4 } from 'uuid';
import './productList.scss'

import {connect} from 'react-redux';


import Service from "../../service/Service";
import { fetchProducts } from "../../redux/Shopping/actions";

class ProductList extends PureComponent{
   
    
    componentDidMount(){
        this.props.onFetchData()
        // .then(res => console.log(res))
            
    }
   

    render(){
        
        const {items, loading, error} = this.props;
        const {products} = items.category ? items.category : [];
        if(!products){
            return <></>
        } 
        // console.log(items)
        return(
            <main>
                {/* <h1>{items.category.name}</h1> */}
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
    error: state.shop.error
  });

// const mapDispatchToProps = (dispatch) => {
//     return{
//         onFetchData: () => dispatch(fetchProducts())
//     } 
// }

export default connect(mapStateToProps, {
    onFetchData: fetchProducts
})(ProductList);