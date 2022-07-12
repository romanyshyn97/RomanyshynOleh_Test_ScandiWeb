export const GET_CURRENCIES = `
query currencies {
    currencies{
      label,
      symbol
    }
  }`

export const GET_CATEGORY = ` query category {
    category(input:{title:"all"}){
         name,
      products{
        id,
        name,
        description,
        gallery,
        prices{
          currency{symbol},
          amount
        }
      }
    }
    }` 

