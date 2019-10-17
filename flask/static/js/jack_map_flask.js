// ===============================================================================================================
// Map of Minnehaha Creek Watershed, with links to data for each measurement site
// -------- (version 1.0)
// ===============================================================================================================


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
  zoom: 12,
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

// Store API url
var lake_locations_route = "/api/lake_info";

// Grab lake location data with d3, then add markers to map layer
d3.json(lake_locations_route).then( (lake_info) => {

  // loop through lakes and create markers with
  for (i=0; i<Object.keys(lake_info).length; i++) {
    
    var latlng = [lake_info[i].lat, lake_info[i].lng];

    // create marker at coordinates, with hover title
    var marker = L.marker(latlng, {
      title: `Lake: ${lake_info[i].name}`,
      icon: icons.LAKES
    });

    // append marker to markers list, add popup
    marker.addTo(layers.LAKES)
      .bindPopup(`<center><h4><b>Lake:</b> ${lake_info[i].name}</h4><br><button onclick="buildLineChart(${lake_info[i].id})">Explore Data</button></center>`);

  }
});


// =================================================================================================
// CREEK SITES LAYER
// =================================================================================================

// Store API url
var creek_locations_route = "/api/creek_info";

// Grab lake location data with d3, then add markers to map layer
d3.json(creek_locations_route).then( (site_info) => {

  // loop through creek sites from API
  for (i=0; i < Object.keys(site_info).length; i++) {
    
    var latlng = [site_info[i].lat, site_info[i].long];

    // create marker at coordinates, with hover title
    var marker = L.marker(latlng, {
      title: `Creek Site: ${site_info[i].name}`,
      icon: icons.CREEK_SITES
    });

    // append marker to markers list, add popup
    marker.addTo(layers.CREEK_SITES)
      .bindPopup(`<center><h4><b>Creek site:</b> ${site_info[i].name}</h4><br><a href="">Explore Data</a></center>`);

  }
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
