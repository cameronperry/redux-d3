import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import VisualizationContainer from './components/VisualizationContainer';

export default (
    <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/Example1" component={VisualizationContainer} />
        <Route path="/Example2" component={VisualizationContainer} />
        <Route path="/Example3" component={VisualizationContainer} />
    </Route>
);