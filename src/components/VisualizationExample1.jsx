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
  componentDidMount() {
    const {dataPoints, attributes} = this.getVariables();

    dataPoints.enter()
      .append("rect")
      .on('click', this.onDataPointClick)
      .attr(attributes);

    window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  componentDidUpdate: function() {
    const {dataPoints, attributes, startAttributes} = this.getVariables();

    dataPoints.transition()
      .attr(attributes);

    dataPoints.enter()
      .append("rect")
      .on('click', this.onDataPointClick)
      .attr(startAttributes)
      .transition()
      .attr(attributes);

    dataPoints.exit()
      .remove();
  },
  handleResize() {
    const {dataPoints, attributes} = this.getVariables();

    dataPoints.transition()
      .duration(0)
      .attr(attributes);
  },
  getVariables() {
    const {width, height} = VisualizationUtils.getDimensions(this.refs.svg, this.props.margin);
    const {xScale, yScale} = VisualizationUtils.getScaleFunctions(this.props.data, width, height);
    const dataPoints = VisualizationUtils.getDataPoints(this.refs.container, this.props.data);
    const attributes = VisualizationUtils.getAttributes(height, xScale, yScale, this.props.selection, this.props.colors);
    const startAttributes = VisualizationUtils.getAnimationStartAttributes(width, height, xScale, this.props.colors);

    return {dataPoints, attributes, startAttributes};
  },
  onDataPointClick(d, i) {
    d3.event.stopPropagation();
    this.props.onSelect(i);
  },
  onSvgClick() {
    this.props.onSelect(-1);
  },
  render: function() {
    console.log('Visualization Render');

    return (
      <div className="Visualization-Container">
        <svg className="Visualization-Canvas" ref="svg" onClick={this.onSvgClick}>
          <g ref="container" transform={`translate(${this.props.margin},${this.props.margin})`} />
        </svg>
      </div>
    );
  }
});
