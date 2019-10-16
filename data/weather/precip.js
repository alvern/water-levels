Plotly.d3.csv("precip_msp_airport_1939.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

  
var trace1 = {
  type: "scatter",
  mode: "lines",
  name: 'PRCP',
  x: unpack(rows, 'DATE'),
  y: unpack(rows, 'PRCP'),
  line: {color: '#17BECF'}
}

var trace2 = {
  type: "scatter",
  mode: "lines",
  name: 'SNOW',
  x: unpack(rows, 'DATE'),
  y: unpack(rows, 'SNOW'),
  line: {color: '#7F7F7F'}
}

var data = [trace2,trace1];
    
var layout = {
  title: 'Precipitation at MSP airport since 1939', 
  yaxis: {
    title: {
      text: 'inches'
    }
  }
};

Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true});
})
