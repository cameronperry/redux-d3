import {createStore, applyMiddleware, compose} from 'redux';
import reducer from '../reducers';
import ActionMiddleware from './ActionMiddleware';

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState, compose(
        applyMiddleware(ActionMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    return store;
}