import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap-css-only/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import JavascriptTimeAgo from 'javascript-time-ago';

// The desired locales.
import en from 'javascript-time-ago/locale/en'

// Initialize the desired locales.
JavascriptTimeAgo.locale(en)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
