import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import rootReducer from './reducers/index';
import theme from './theme';
import './index.css';
import * as serviceWorker from './serviceWorker';

/*
 * config redux
 */
const store = configureStore({
  reducer: rootReducer,
});

export default store;

const render = () => {
  const App = require('./App').default;

  /* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers/index', () => {
    const newRootReducer = require('./reducers/index').default;
    store.replaceReducer(newRootReducer);
  });
  module.hot.accept('./App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
