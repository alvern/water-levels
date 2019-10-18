// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var map = L.map("map", {
    center: [44.953457, -93.502959],
    zoom: 12
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 50,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);


var watershed = "water-levels/data/geospatial/Watersheds.geojson";



// Grabbing our GeoJSON data..
d3.json(watershed, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(map);
  console.log(data)

  // Loop through the siteData array and create one marker for each site
  for (var i = 0; i < data.length; i++) {
    var watershedArea = data[i];
    L.multiPolygon(data.features.coordinates)
      .addTo(map);
  }

});



// Code from NY Boroughs #2
// // Our style object
// var mapStyle = {
//     color: "black",
//     fillColor: "blue",
//     fillOpacity: 0.25,
//     weight: 1.5
//   };

// // Grabbing our GeoJSON data..
// d3.json(watershed, function(data) {
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data, {
//     // Passing in our style object
//     style: mapStyle
//   }).addTo(map);
// });


//----------------Site Location Markers----------------//
// Load csv from water-levels/data/geospatial/site_locations.csv
var siteCSV = d3.csv("water-levels/data/geospatial/site_locations.csv", function(siteData) {

    // Print the Data
    console.log(siteData);
  
  // Loop through the siteData array and create one marker for each site
  for (var i = 0; i < siteData.length; i++) {
    var site = siteData[i];
    L.marker([site.lat, site.long])
      .addTo(map);
  }
});


