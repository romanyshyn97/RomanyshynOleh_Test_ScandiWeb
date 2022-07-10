import { PureComponent } from "react";
import SingleItem from "../singleItem/SingleItem";
import { v4 as uuidv4 } from 'uuid';
import './productList.scss'
// import gql from "graphql-tag";
import { Query } from "react-apollo";
import './productList.scss';
import { GET_CATEGORY } from "../../service/Queries";

// const GET_CATEGORY = gql` query category {
//     category(input:{title:"all"}){
//          name,
//       products{
//         id,
//         name,
//         description,
//         gallery
//       }
//     }
//     }`


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
                                    <SingleItem 
                                        name={name}
                                        gallery={gallery}
                                        id={id} key={uuidv4()}/>
                                ))}
                            </div>
                        </>       
                    );
                    }}
                </Query>
            </main>
            
        )
    }
}

export default ProductList;
