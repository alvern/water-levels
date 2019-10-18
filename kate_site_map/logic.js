
var API_KEY = "sk.eyJ1IjoiYWx2ZXJuIiwiYSI6ImNrMWxqZnNjejAxazczbm1ic3VpaWVtbXMifQ.ybo-3Wvk4XJXpcT0SpsYXQ"
// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var map = L.map("map", {
    center: [44.953457, -93.502959],
    zoom: 25
  });
  
  // Adding a tile layer (the background map image) to our map
// var dataset_token = "ck1sm9n9q2jld2inpctk627yv"
// https://api.mapbox.com/datasets/v1/alvern/{dataset_id}?access_token=
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/v4/{tileset_id}/", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 100,
    id: "mapbox.streets",
    accessToken: API_KEY,
    tileset_id: "alvern.ck1sm9n9q2jld2inpctk627yv-0ofls",
    zoom: 25,
    format: ".vector.pbf"
  }).addTo(map);


// var watershed = "water-levels/data/geospatial/Watersheds.geojson";
var siteLocations = d3.csv("water-levels/data/geospatial/site_locations.csv")

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

// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
for (var i = 0; i < siteLocations.length; i++) {
    var site = siteLocations[i];
    L.marker(site.Coordinates)
      .addTo(map);
  }
