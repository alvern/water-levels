// Script to create SVG line chart for lake level data

//=============================================================================


function buildLineChart(lakeId) {

  // Initial Setup
  // -----------------------------------------------------

  // svg container dimensions
  var height = 700;
  var width = 1000;

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
    .html("")   // clear html
    .append("svg")
    .attr("height", height)
    .attr("width", width);

  // translate chart elements by left and top margins
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // --------------------------------------------------------------


  console.log("getting data");

  // Import data
  d3.json(`/api/lakes/${lakeId}`).then( function(lakeData) {
    console.log(lakeData);
    
    // function to parse date string as date
    var parseTime = d3.timeParse("%Y-%m-%d");

    // Format the measurement date and elevation
    for (i=0; i < lakeData.read_dates.length; i++) {
      lakeData.read_dates[i] = parseTime(lakeData.read_dates[i]);
      lakeData.elevations[i] = +lakeData.elevations[i]
    }
    
    // Time scale x-axis
    var xTimeScale = d3.scaleTime()
      .domain(d3.extent(lakeData.read_dates))
      .range([0, chartWidth]);

    // get midpoint of elevation
    var elevationMidpoint = (d3.min(lakeData.elevations) + d3.max(lakeData.elevations) ) / 2;
    
    // elevation buffer determines set buffer on either side of midpoint
    var elevationBuffer = 100;

    // linear scale y-axis
    var yLinearScale = d3.scaleLinear()
      .domain([elevationMidpoint - elevationBuffer/2, elevationMidpoint + elevationBuffer/2])
      .range([chartHeight, 0]);

    // create axes
    var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));
    var leftAxis = d3.axisLeft(yLinearScale);
    
    // Add x-axis
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    // Add y-axis
    chartGroup.append("g").call(leftAxis);

    // Line generator
    var line = d3.line()
      .x(d => xTimeScale(d.read_dates))
      .y(d => yLinearScale(d.elevations));

    // Append a path for line
    chartGroup
      .data([lakeData])
      .append("path")
      .attr("d", line)
      .classed("line green", true);


  }).catch(function(error) {
    console.log(error);
  });
}

// var lakeId = '27001800';
// buildLineChart(lakeId);

