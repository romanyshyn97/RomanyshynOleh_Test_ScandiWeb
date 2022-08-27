export const GET_CATEGORY = ` query category($category: String!) {
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

export const GET_CURRENCIES = `
query currencies {
    currencies{
      label,
      symbol
    }
  }`;

export const GET_CATEGORIES_NAMES = `
query categories {
    categories{
    name,
    products{
      id
    }
  }
}`

