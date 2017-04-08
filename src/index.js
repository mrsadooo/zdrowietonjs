import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/App.jsx';
import store from './store';
import './styles/index.scss';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'));