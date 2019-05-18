import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { HashRouter, Route, Switch } from "react-router-dom";

import "antd/dist/antd.css";
import './scss/index.scss';
import App from './App';
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  credentials: "include",
  cache: new InMemoryCache({ addTypename: true, dataIdFromObject: (object) => object.id }),
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3001"
  }
});

const WithApollo = () => (
  <ApolloProvider client={client}>
    <HashRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/" component={App} />
      </Switch>
    </HashRouter>
  </ApolloProvider>
)

ReactDOM.render(<WithApollo />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
