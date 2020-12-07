import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import reportWebVitals from './reportWebVitals';
import { DG_USER_TOKEN } from "./constant"
import { setContext } from "@apollo/client/link/context"

const httpLink =createHttpLink({
  uri: 'http://localhost:8000/api/',
})

const authLink =setContext((_, {headers})=>{
  //get the token from localstorage
  const token =localStorage.getItem(DG_USER_TOKEN)
   

  //return the headers to the context so httplink can recognise them
  return {
    headers:{
      ...headers,
      authorization:token ? `JWT ${token}` : ""
    }
  }

})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>,  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
