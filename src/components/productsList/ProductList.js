import { PureComponent } from "react";

import cart from '../../resources/cart-white.svg';
import './productList.scss'
import gql from "graphql-tag";
import { Query } from "react-apollo";
import './productList.scss'

const GET_CATEGORY = gql` query category {
    category(input:{title:"all"}){
         name,
      products{
        id,
        name,
        description,
        gallery
      }
    }
    }`

class ProductList extends PureComponent{
    render(){

        return(
            <main>
                
                <Query query={GET_CATEGORY}>
                {({ data, loading, error }) => {
                    if(loading) return <p>loading..</p>;
                    if(error) return <p>error</p>
                return (
                    <>
                    <h1>{data.category.name.toUpperCase()}</h1>
                    <div className="grid">
                    {data.category.products.map(({name, gallery, id}) => (
                    <div className="single-item" key={id}>
                        <div className="single-item_image">
                            <img src={gallery} alt={name} />
                        </div>
                            
                      
                        <div className="single-item_cart">
                            <img src={cart} alt="cart" />
                        </div>
                        <div className="single-item_name">
                            <h5>
                                {name}
                            </h5>
                            <p>
                                $50.00
                            </p>
                        </div>
                    </div>
                    ))}
                </div></>
                    
                    
            );
                }}
            </Query>
                
            </main>
            
        )
    }
}

export default ProductList;
