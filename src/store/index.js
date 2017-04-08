import { createStore, compose } from 'redux';
import modules from '../modules';

const _compose = process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose: compose;

const store = createStore(modules,{}, _compose());

export default store;