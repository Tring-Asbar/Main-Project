import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom'
import { config } from './Config/config.ts';
import { Amplify } from 'aws-amplify'
import {ApolloClient,InMemoryCache,ApolloProvider, HttpLink, from} from '@apollo/client'
import { setContext } from "@apollo/client/link/context";


import { amplifyConfig } from './Config/config.ts'


Amplify.configure(amplifyConfig)

const httpLink = new HttpLink({
  uri :config.backendUrl,

})

const authLink = setContext((_: any, { headers }:any) => {
  const token = localStorage.getItem("CognitoIdentityServiceProvider.7sbasdbqu0u6br0mbpuls0hb7h.schooladmin01.accessToken");
  
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([authLink,httpLink]),
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
