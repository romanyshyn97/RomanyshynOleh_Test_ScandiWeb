
import React from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";
import AppHeader from '../appHeader/AppHeader';
import ProductList from "../productsList/ProductList";
import './app.css'

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  
})

// client
//   .query({
//     query: gql`
//     query product {
//       category(input:{title:"tech"}){
//          name,
//         products{
//           id,
//           name,
//           description
//         }
//       }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='app'>
        <AppHeader/>
        <ProductList/>
      </div>
    </ApolloProvider>
    

  );
}

export default App;
