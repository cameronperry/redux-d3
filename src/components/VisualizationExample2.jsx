import './Visualization.css';
import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3';
import VisualizationUtils from '../utils/VisualizationUtils';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    data: React.PropTypes.array,
    selection: React.PropTypes.number,
    onSelect: React.PropTypes.func,
    margin: React.PropTypes.number,
    colors: React.PropTypes.func
  },
  getDefaultProps() {
    return {
      margin: 20,
      colors: d3.scale.category20()
    };
  },
  getInitialState() {
    return {
      width: 0,
      height: 0
    };
  },
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  handleResize() {
    const {width, height} = VisualizationUtils.getDimensions(this.refs.svg, this.props.margin);
    this.setState({width, height});
  },
  onSvgClick() {
    this.props.onSelect(-1);
  },
  render: function() {
    console.log('Visualization Render');

    const data = this.props.data;
    const {width, height} = this.state;
    const {xScale, yScale} = VisualizationUtils.getScaleFunctions(data, width, height);

    return (
      <div className="Visualization-Container">
        <svg className="Visualization-Canvas" ref="svg" onClick={this.onSvgClick}>
          <g transform={`translate(${this.props.margin},${this.props.margin})`}>
            {data.map((d, i) => {
              return (
                <rect
                  key={d.key}
                  x={xScale(d.key)}
                  y={height - yScale(d.value)}
                  width={xScale.rangeBand()}
                  height={yScale(d.value)}
                  fill={this.props.selection === i ? 'red' : this.props.colors(d.key)}
                  onClick={(e) => {
                    e.stopPropagation();
                    this.props.onSelect(i);
                  }}
                />
              );
            })}
          </g>
        </svg>
      </div>
    );
  }
});
