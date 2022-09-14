export const GET_CATEGORY = ` 
  query category($category: String!) {
    category(input:{title:$category}){
         name,
         
      products{
        id,
        name,
        brand,
        category,
        inStock,
        description,
        gallery,
        prices{
          currency{symbol},
          amount
        },
        attributes{
          id,
          name,
          type,
          items{
            displayValue,
            value
          },
        }
      }
    }
    
    }`;

    export const GET_CURRENCIES_CATEGORIES = ` 
      query { 
        currencies { 
          label, 
          symbol 
        },  
        categories { 
            name, 
            products { 
                id 
            } 
        } 
      }`;

export const GET_CURRENT_PRODUCT = `query product($id: String!) {
  product(id:$id){
    id,
    name,
    brand,
    inStock,
    gallery,
    description,
    category,
    prices{
      currency{
        label,
        symbol
      }
      amount
    }
    attributes{
      id,name, type, items{
        displayValue,
        value
      }
    }
    
  }
}`  

