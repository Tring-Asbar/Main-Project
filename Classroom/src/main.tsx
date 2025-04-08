import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom'
import { Amplify } from 'aws-amplify'
import {ApolloClient,InMemoryCache,ApolloProvider, HttpLink, from} from '@apollo/client'
import { setContext } from "@apollo/client/link/context";
import { onError } from '@apollo/client/link/error';
import ToastMessage from './Components/customComponents/Toast/ToastMessage';

import { amplifyConfig,config } from './Config/config'


Amplify.configure(amplifyConfig)


const httpLink = new HttpLink({
  uri :config.backendUrl,

})

export const getAccessTokenFromLocalStorage = () => {
  const keys = Object.keys(localStorage);
  const tokenKey = keys.find((key) =>
    key.endsWith(".accessToken")
  );
  
  return tokenKey ? localStorage.getItem(tokenKey) : null;
};

const authLink = setContext((_: any, { headers }:any) => {
  const token = getAccessTokenFromLocalStorage();
  console.log(token)
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let shouldLogout = false;

  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        shouldLogout = true;
        break;
      }
    }
  }

  if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
    shouldLogout = true;
  }

  if (shouldLogout) {
    localStorage.clear();
    ToastMessage({message:"Session expired. Please log in again.",toastType:'error'})
    setTimeout(() => {
      window.location.href = '/admin-login';
    }, 3000); 
  }
});

const client = new ApolloClient({
  link: from([authLink,httpLink,errorLink]),
  cache:new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
      <ToastContainer/>
    </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
)
