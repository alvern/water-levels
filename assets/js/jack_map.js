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
​
​
var watershed = "../../data/geospatial/Watersheds.geojson";
​
// // Grabbing our GeoJSON data..
// d3.json(watershed, function(data) {
//     // Creating a GeoJSON layer with the retrieved data
//     console.log(data)
  // L.geoJson(data).addTo(map);
  // console.log(data)
​
// Help from Jack
// var boundary = L.polyLine(data).addTo(map);
​
  // data["features"].forEach(function(feature) {
  //   var coordinates = feature["geometry"]["coordinates"]
  //   console.log(coordinates)
  //   });
  
​
// });
​
// Code with Max
// data["features"].forEach(function(feature) {
//   var coordinates = feature["geometry"]["coordinates"]
//   console.log(coordinates)
//   });
​
// for (var i = 0; i < data.length; i++) {
//   var coordinates = data['features'][0]//[i]["geometry"]["coordinates"];
//   console.log(coordinates)
  // for (var j= 0; j < coordinates.length; j++){
  //    var test = coordinates[[[j]]];
  // console.log(test);
  // }

// // Loop through the siteData array and create one marker for each site
//   for (var i = 0; i < data.length; i++) {
//     var watershedArea = data.features.geometry[i];
//     L.multiPolygon(coordinates)
//       .addTo(map);      
// }
// console.log(watershedArea)
// });
​
​
​
// Code from NY Boroughs #2
// // Our style object
// var mapStyle = {
//     color: "black",
//     fillColor: "blue",
//     fillOpacity: 0.25,
//     weight: 1.5
//   };
​
// // Grabbing our GeoJSON data..
// d3.json(watershed, function(data) {
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data, {
//     // Passing in our style object
//     style: mapStyle
//   }).addTo(map);
// });
​
​
//----------------Site Location Markers----------------//
// Load csv from water-levels/data/geospatial/site_locations.csv
​
// water-levels/kate_site_locations/data/site_locations_edited.csv
​
var locations = "/data/site_locations_edited.csv"
​
var siteCSV = d3.csv(locations, function(siteData) {
​
  // Print the Data
  console.log(siteData);

  // Loop through the siteData array and create one marker for each site
  for (var i = 0; i < siteData.length; i++) {
    var site = siteData[i];
    L.marker([site.lat, site.long])
      .bindPopup("<h1>" + site.site + "</h1> <hr> <h3>" + site.name + "<h3>Water Level:   </h3>")
      .addTo(map);
  }
});