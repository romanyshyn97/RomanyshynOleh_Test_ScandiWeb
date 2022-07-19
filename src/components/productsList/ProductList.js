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
import SingleItem from "../singleItem/SingleItem";
import { v4 as uuidv4 } from 'uuid';
import './productList.scss'

import {connect} from 'react-redux';


import Service from "../../service/Service";

class ProductList extends PureComponent{
    

    render(){
        const {products} = this.props;
        return(
            <main>
                <h1>ALL</h1>
                <div className="grid">
                    {products.map(item => (
                        <SingleItem key={item.id} productData={item} />
                    ))}
                    
                </div>   
            </main>
            
        )
    }
}

const mapStateToProps = state => {
    return{
        products: state.shop.products,

    }
}

export default connect(mapStateToProps)(ProductList);