import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, hashHistory} from 'react-router';
import Routes from './Routes';
import ConfigureStore from './store/ConfigureStore';

ReactDOM.render(
    <Provider store={ConfigureStore()}>
        <Router history={hashHistory}>{Routes}</Router>
    </Provider>,
    document.getElementById('app')
);