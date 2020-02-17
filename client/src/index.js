import React from 'react';
import ReactDOM from 'react-dom';
import { Client, Provider, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const cache = cacheExchange({
  keys: {
    Feed: _ => `feed`, // TODO: Should cache by pagination params?
  },
});
const client = new Client({
  url: 'http://localhost:4000',
  exchanges: [dedupExchange, cache, fetchExchange],
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
