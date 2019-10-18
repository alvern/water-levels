console.log("connection working");

// =================================================================================================================
// INITIAL MAP SETUP
// =================================================================================================================

// street map background tile layer
var streetmap =  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 15,
    id: "mapbox.streets",
    accessToken: API_KEY
});

// satellite map background tile layer
var satellitemap =  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 15,
    id: "mapbox.satellite",
    accessToken: API_KEY
});

// dark map background tile layer
var darkmap =  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 15,
    id: "mapbox.dark",
    accessToken: API_KEY
});

// Initialize all of the LayerGroups to be used
var layers = {
  LAKES: new L.LayerGroup(),
  CREEK_SITES: new L.LayerGroup(),
  BOUNDARIES: new L.LayerGroup()
};

// Create the map with layers
var map = L.map("map", {
  center: [44.953457, -93.502959],
  zoom: 11,
  layers: [
    layers.LAKES,
    layers.CREEK_SITES,
    layers.BOUNDARIES
  ]
});

// Add 'streetmap' tile layer to the map as default
streetmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
    "Lake Sites": layers.LAKES,
    "Creek Sites": layers.CREEK_SITES,
    "Watershed Boundary": layers.BOUNDARIES
};

// create baseMaps object to add to layer control
var baseMaps = {
    "Dark Map": darkmap,
    "Satellite": satellitemap,
    "Street Map": streetmap
};

// Layer Control
L.control.layers(baseMaps, overlays).addTo(map);


// Initialize an object containing icons for each layer group
// icons taken from google chart API
var icons = {
  LAKES: L.icon({
    iconUrl: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|a0fbb0&chf=a,s,ee00FFFF"
  }),
  CREEK_SITES: L.icon({
    iconUrl: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e85141&chf=a,s,ee00FFFF"
  })
};


// =================================================================================================
// LAKE SITES LAYER
// =================================================================================================

// Store csv location
var lake_locations_csv = "../resources/lake_info_transformed.csv";

// Grab lake location data with d3, then add markers to map layer
d3.csv(lake_locations_csv, function(lake_info) {
  // console.log(lake_info);

  var latlng = [lake_info.lat, lake_info.lng];

  // create circle marker at coordinates, with scaled radius and color
  var marker = L.marker(latlng, {
    title: `Lake: ${lake_info.name}`,
    icon: icons.LAKES
  });

  // append marker to markers list
  marker.addTo(layers.LAKES)
    .bindPopup(`<center><h4><b>Lake:</b> ${lake_info.name}</h4><br><a href="">Explore Data</a></center>`);


});


// =================================================================================================
// CREEK SITES LAYER
// =================================================================================================

// Store csv location
var creek_locations_csv = "../../../data/geospatial/site_locations_edited.csv";

// Grab lake location data with d3, then add markers to map layer
d3.csv(creek_locations_csv, function(site_info) {
  // console.log(lake_info);

  var latlng = [site_info.lat, site_info.long];

  // create circle marker at coordinates, with scaled radius and color
  var marker = L.marker(latlng, {
    title: `Creek Site: ${site_info.name}`,
    icon: icons.CREEK_SITES
  });

  // append marker to markers list
  marker.addTo(layers.CREEK_SITES)
    .bindPopup(`<center><h4><b>Creek site:</b> ${site_info.name}</h4><br><a href="">Explore Data</a></center>`);


});


// =================================================================================================
// WATERSHED BOUNDARIES LAYER
// =================================================================================================

// use var 'watershed' from 'watersheds.js' to import into leaflet geoJSON object
var watershedJson = L.geoJSON(watershed, {

  fillColor: 'lightblue',
  
  // highlight subwatershed in red for mouseover
  onEachFeature: function(feature, layer) {

    layer.on("mouseover", function(item) {
      layer.setStyle({fillColor: 'red'})
    })
    .on("mouseout", function(item) {
      layer.setStyle({fillColor: 'lightblue'})
    });
  }
});

// add to layer BOUNDARIES
watershedJson.addTo(layers.BOUNDARIES);