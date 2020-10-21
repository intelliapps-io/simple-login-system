import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './lib/helpers/serviceWorker';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HashRouter } from "react-router-dom";

import "antd/dist/antd.css";
import './lib/less/index.less';
import AppLayout from './AppLayout';

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  credentials: "include",
  cache: new InMemoryCache({
    addTypename: true, typePolicies: {
      UnconventionalRootQuery: {
        // The RootQueryFragment can only match if the cache knows the __typename
        // of the root query object.
        queryType: true,
      },
    }
  }),
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3001"
  }
});

const WithApollo = () => (
  <ApolloProvider client={client}>
    <HashRouter>
      <AppLayout />
    </HashRouter>
  </ApolloProvider>
)

ReactDOM.render(<WithApollo />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
