import gql from "graphql-tag";

export const GET_CURRENCIES = gql`
query currencies {
    currencies{
      label,
      symbol
    }
  }`

export const GET_CATEGORY = gql` query category {
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

