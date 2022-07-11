import {GET_CATEGORY, GET_CURRENCIES} from './Queries';

class Service{
    _host = 'http://localhost:4000/'
    currenciesRequest = async () => {
        return await fetch(`${this._host}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `${GET_CURRENCIES}`,
        }),
        variables: {}
      })
        .then((res) => res.json())
        // .then((result) => console.log(result.data));
    }

    categoryRequest = async () => {
        return await fetch(`${this._host}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `${GET_CATEGORY}`,
        }),
        variables: {}
      })
        .then((res) => res.json())
        
    }
}

export default Service;




