import './Visualization.css';
import React from 'react';
import {connect} from 'react-redux';
import * as VisualizationActions from '../reducers/VisualizationActions';
import VisualizationExample1 from './VisualizationExample1';
import VisualizationExample2 from './VisualizationExample2';
import VisualizationExample3 from './VisualizationExample3';

const VisualizationContainer = React.createClass({
    getDataForm() {
        let buttons;
        if (this.props.selection !== -1) {
            buttons = [
                <button
                    key="update"
                    onClick={this.props.onSubmit}
                    className="Visualization-Form-Button"
                >Update</button>,
                <button
                    key="remove"
                    onClick={this.props.onRemove}
                    className="Visualization-Form-Button"
                >Remove</button>,
            ];
        } else {
            buttons = [
                <button
                    key="create"
                    onClick={this.props.onSubmit}
                    className="Visualization-Form-Button"
                >Create</button>
            ];
        }
        return (
            <div className="Visualization-Form">
                <input
                    value={this.props.value}
                    onChange={(e) => {
                        this.props.onChange(e.target.value);
                    }}
                    className="Visualization-Form-Input"
                    placeholder="Enter an integer"
                />
                {buttons}
            </div>
        );
    },
    getVisualization() {
        const props = {
            data: this.props.data,
            selection: this.props.selection,
            onSelect: this.props.onSelect
        };
        switch (this.props.route.path) {
            case '/Example1':
                return <VisualizationExample1 {...props} />;
            case '/Example2':
                return <VisualizationExample2 {...props} />;
            case '/Example3':
                return <VisualizationExample3 {...props} />;
        }
    },
    render: function() {
        return (
            <div className="Visualization">
                {this.getDataForm()}
                {this.getVisualization()}
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        data: state.Visualization.data,
        selection: state.Visualization.selection,
        value: state.Visualization.value
    };
}

export default connect(
    mapStateToProps,
    VisualizationActions
)(VisualizationContainer);