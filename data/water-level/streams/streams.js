Plotly.d3.csv("CPA01_2017-2018_TrollData.csv", function (row1) {
    Plotly.d3.csv("CLO01_2017-2018_TrollData.csv", function (row2) {
        Plotly.d3.csv("CLO08_2017-2018_TrollData.csv", function (row3) {
            Plotly.d3.csv("CLO09_2017-2018_TrollData.csv", function (row4) {
                Plotly.d3.csv("CMH01_2017-2018_TrollData.csv", function (row5) {
                    Plotly.d3.csv("CGL01_2017-2018_TrollData.csv", function (row6) {

                        function unpack(row1, key) {
                            return row1.map(function (row) { return row[key]; });
                        }
                        function unpack(row2, key) {
                            return row2.map(function (row) { return row[key]; });
                        }
                        function unpack(row3, key) {
                            return row3.map(function (row) { return row[key]; });
                        }
                        function unpack(row4, key) {
                            return row4.map(function (row) { return row[key]; });
                        }
                        function unpack(row5, key) {
                            return row5.map(function (row) { return row[key]; });
                        }
                        function unpack(row6, key) {
                            return row6.map(function (row) { return row[key]; });
                        }

                        var trace1 = {
                            type: "scatter",
                            mode: "lines",
                            name: 'Painter Creek',
                            x: unpack(row1, 'Date'),
                            y: unpack(row1, 'Stage [ft]'),
                            line: { color: '00b8ff' }
                        };
                        var trace2 = {
                            type: "scatter",
                            mode: "lines",
                            name: 'Long Lake',
                            x: unpack(row2, 'Date'),
                            y: unpack(row2, 'Stage [ft]'),
                            line: { color: '1034a6' }
                        };
                        var trace3 = {
                            type: "scatter",
                            mode: "lines",
                            name: 'Tanglewood',
                            x: unpack(row3, 'Date'),
                            y: unpack(row3, 'Stage [ft]'),
                            line: { color: '008ecc' }
                        };
                        var trace4 = {
                            type: "scatter",
                            mode: "lines",
                            name: 'Wolsfeld Lake',
                            x: unpack(row4, 'Date'),
                            y: unpack(row4, 'Stage [ft]'),
                            line: { color: '3fe0d0' }
                        };
                        var trace5 = {
                            type: "scatter",
                            mode: "lines",
                            name: '494 & Minnetonka Blvd.',
                            x: unpack(row5, 'Date'),
                            y: unpack(row5, 'Stage [ft]'),
                            line: { color: '0080ff' }
                        };
                        var trace6 = {
                            type: "scatter",
                            mode: "lines",
                            name: 'Gleason Lake',
                            x: unpack(row6, 'Date'),
                            y: unpack(row6, 'Stage [ft]'),
                            line: { color: '468284' }
                        };

                        var data = [trace1, trace2, trace3, trace4, trace5, trace6];
                        var layout = {
                            title: 'Streams',
                            yaxis: {
                                title: {
                                    text: 'feet'
                                }
                            }
                        };
                        Plotly.newPlot('myDiv', data, layout, {});
                    })
                })
            })
        })
    })
})