// svg container dimensions
var height = 700;
var width = 700;

// margins
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// chart area
var chartHeight = height - margin.top - margin.bottom;
var chartWidth = width - margin.left - margin.right;

// create svg container
var svg = d3.select("#lineChart")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

// translate chart elements by left and top margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);





