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
    colors: React.PropTypes.func,
    frames: React.PropTypes.number,
    duration: React.PropTypes.number,
    easing: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      margin: 20,
      colors: d3.scale.category20(),
      frames: 30,
      duration: 250,
      ease: 'quad'
    };
  },
  getInitialState() {
    return {
      data: [],
      animationStack: []
    };
  },
  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  requiresAnimation(oldProps, newProps) {
    if (oldProps.selection !== newProps.selection) {
      return true;
    }
    if (oldProps.data.length !== newProps.data.length) {
      return true;
    }
    let differentData = false;
    oldProps.data.forEach((d, i) => {
      if (d.key !== newProps.data[i].key || d.value !== newProps.data[i].value) {
        differentData = true;
      }
    });
    return differentData;
  },
  componentWillReceiveProps: function(nextProps) {
    if (!this.requiresAnimation(this.props, nextProps)) {
      return;
    }
    const {width, height} = VisualizationUtils.getDimensions(this.refs.svg, nextProps.margin);
    const {xScale, yScale} = VisualizationUtils.getScaleFunctions(nextProps.data, width, height);
    const attributes = VisualizationUtils.getAttributes(height, xScale, yScale, nextProps.selection, nextProps.colors);
    const startAttributes = VisualizationUtils.getAnimationStartAttributes(width, height, xScale, nextProps.colors);
    const interpolateData = nextProps.data.map((d, i) => {
      let startData;
      if (this.state.animationStack.length) {
        const existingPoint = VisualizationUtils.findDataPoint(this.state.animationStack[0], d.key);
        if (existingPoint) {
          startData = {
            key: d.key,
            x: existingPoint.x(1),
            y: existingPoint.y(1),
            width: existingPoint.width(1),
            height: existingPoint.height(1),
            fill: existingPoint.fill(1)
          };
        }
      } else {
        startData = VisualizationUtils.findDataPoint(this.state.data, d.key);
      }
      if (!startData) {
        startData = {
          key: d.key,
          x: startAttributes.x,
          y: startAttributes.y,
          width: startAttributes.width,
          height: startAttributes.height,
          fill: startAttributes.fill(d)
        }
      }
      return {
        key: d.key,
        x: d3.interpolateNumber(startData.x, attributes.x(d)),
        y: d3.interpolateNumber(startData.y, attributes.y(d)),
        width: d3.interpolateNumber(startData.width, attributes.width),
        height: d3.interpolateNumber(startData.height, attributes.height(d)),
        fill: d3.interpolateRgb(startData.fill, attributes.fill(d, i))
      }
    });
    if (interpolateData.length) {
      const animationStack = this.state.animationStack.slice();
      animationStack.push(interpolateData);
      this.setState({animationStack: animationStack}, () => {
        this.startAnimation();
      });
    }
  },
  animationInterval: null,
  startAnimation() {
    if (this.animationInterval || !this.state.animationStack.length || !this.state.animationStack[0].length) {
      return;
    }
    const initialData = this.state.animationStack[0].map((d, i) => {
      return {
        key: d.key,
        x: d.x(0),
        y: d.y(0),
        width: d.width(0),
        height: d.height(0),
        fill: d.fill(0)
      };
    });
    this.setState({
      data: initialData,
    });
    let animationIntervalCount = 0;
    let animationInterpolateInterval = 1 / (this.props.frames - 1);
    const easingFunction = d3.ease(this.props.ease);
    this.animationInterval = setInterval(() => {
      let animationInterpolateValue = easingFunction(animationInterpolateInterval * animationIntervalCount);
      if (animationInterpolateValue > 1) {
        animationInterpolateValue = 1;
      }
      const data = this.state.animationStack[0].map((d, i) => {
        return {
          key: d.key,
          x: d.x(animationInterpolateValue),
          y: d.y(animationInterpolateValue),
          width: d.width(animationInterpolateValue),
          height: d.height(animationInterpolateValue),
          fill: d.fill(animationInterpolateValue)
        }
      });
      this.setState({data: data});
      if (animationInterpolateValue === 1) {
        this.endAnimation();
      }
      animationIntervalCount++;
    }, this.props.duration / this.props.frames);
  },
  endAnimation() {
    clearInterval(this.animationInterval);
    this.animationInterval = false;
    const animationStack = this.state.animationStack.slice();
    animationStack.shift();
    this.setState({animationStack}, () => {
      this.startAnimation();
    });
  },
  handleResize() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
    const {width, height} = VisualizationUtils.getDimensions(this.refs.svg, this.props.margin);
    const {xScale, yScale} = VisualizationUtils.getScaleFunctions(this.props.data, width, height);
    const attributes = VisualizationUtils.getAttributes(height, xScale, yScale, this.props.selection, this.props.colors);

    const newData = this.props.data.map((d, i) => {
      return {
        key: d.key,
        x: attributes.x(d),
        y: attributes.y(d),
        width: attributes.width,
        height: attributes.height(d),
        fill: attributes.fill(d, i)
      };
    });
    this.setState({data: newData, animationStack: []});
  },
  onSvgClick() {
    this.props.onSelect(-1);
  },
  render: function() {
    console.log('Visualization Render');

    return (
      <div className="Visualization-Container">
        <svg className="Visualization-Canvas" ref="svg" onClick={this.onSvgClick}>
          <g transform={`translate(${this.props.margin},${this.props.margin})`}>
            {this.state.data.map((d, i) => {
              return (
                <rect
                  key={d.key}
                  x={d.x}
                  y={d.y}
                  width={d.width}
                  height={d.height}
                  fill={d.fill}
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
