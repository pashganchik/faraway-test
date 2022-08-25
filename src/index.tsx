import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';

import rootSaga from './redux/sagas';
import { createReducer } from './redux/reducer';
import App from './App';

import './index.css';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(createReducer(), applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
