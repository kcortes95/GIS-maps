$( document ).ready(function() {

  if ("geolocation" in navigator){ //check geolocation available
    	navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        showMap(lat, lng);
  		});
  }else{
  	alert("Browser doesn't support geolocation!");
    window.location.replace("http://stackoverflow.com");
  }

});

function showMap(lat, lng){

  var map = L.map('map').setView([lat, lng], 13);

  //https://wiki.openstreetmap.org/wiki/Tile_servers
  //https://mappinggis.com/2018/03/como-anadir-mapas-base-en-qgis-3-0-openstreetmap-google-carto-stamen/

  //http://tile.thunderforest.com/outdoors/${z}/${x}/${y}.png
  //https://c.basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}.png

  //L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //L.tileLayer('https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
  //L.tileLayer('https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png', {
  //L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
  L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  //L.tileLayer('https://mt1.google.com/vt?lyrs=h@159000000,traffic|seconds_into_week:-1&style=3&x={x}&y={y}&z={z}', {

    maxZoom: 100,
    id: 'mapbox.light'
  }).addTo(map);

  function onEachFeature(feature, layer) {
    var popupContent = "<p>I started out as a GeoJSON " + feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
  }


  L.geoJSON([bicycleRental], {

    style: function (feature) {
      return feature.properties && feature.properties.style;
    },

    onEachFeature: onEachFeature,

    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });
    }
  }).addTo(map);


}
