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

  //https://openmaptiles.org/styles/
  //L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
