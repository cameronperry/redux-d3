import d3 from 'd3';

function getDimensions(svgNode, margin) {
  const svg = d3.select(svgNode);
  return {
    width: parseInt(svg.style("width"), 10) - margin * 2,
    height: parseInt(svg.style("height"), 10) - margin * 2
  };
}

function getDataPoints(containerNode, data) {
  return d3.select(containerNode)
    .selectAll("rect")
    .data(data, function(d) { return d.key; });
}

function findDataPoint(data, key) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].key === key) {
      return data[i];
    }
  }
}

function getScaleFunctions(data, width, height) {
  return {
    xScale: d3.scale.ordinal()
      .domain(data.map((d) => d.key))
      .rangeRoundBands([0, width], 0.1, 0),
    yScale: d3.scale.linear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([5, height])
      .clamp(true)
  };
}

function getAttributes(height, xScale, yScale, selection, colors) {
  return {
    x: (d) => (xScale(d.key)),
    y: (d) => (height - yScale(d.value)),
    width: xScale.rangeBand(),
    height: (d) => (yScale(d.value)),
    fill: (d, i) => (selection === i ? 'red' : colors(d.key))
  };
}

function getAnimationStartAttributes(width, height, xScale, colors) {
  return {
    x: width,
    y: height,
    width: xScale.rangeBand(),
    height: 0,
    fill: (d) => (colors(d.key))
  };
}

export default {
  getDimensions,
  getDataPoints,
  findDataPoint,
  getScaleFunctions,
  getAttributes,
  getAnimationStartAttributes
};
