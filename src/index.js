import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './App';
import store from './redux/store'
import reportWebVitals from './reportWebVitals';
import './scss/reset.scss';
import './scss/base.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
ReactDOM.render(
    <BrowserRouter>
     <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

serviceWorkerRegistration.register()
reportWebVitals();
