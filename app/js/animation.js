
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: { lat: 60.192059, lng: 24.945831 },
  });
  shp("shape_activity/Shapefiles-20181124T090813Z-001.zip").then(function (geojson) {
    var data = [];
    for (var i = geojson.features.slice(0, 2000).length - 1; i >= 0; i--) {
      var dataset = [];
      var geoBox = geojson.features[i].geometry.coordinates[0];
      for (var x = geoBox.length - 1; x >= 0; x--) {
        dataset.push(
          { lat: geoBox[x][1], lng: geoBox[x][0] }
        )
      }
      var geometry = new google.maps.Data.Polygon([dataset]);
      geometry.feature = { name: "asd" }
      console.log("geometry");
      map.data.add({ geometry, feature: { asd: '1' } })
    }
    map.data.setStyle(function (feature) { 
      if (feature.getProperty('isColorful')) {
        return ({
          fillColor: 'red',
          strokeColor: 'red',
          strokeWeight: 1
        });
      }
      return ({
        fillColor: 'blue',
        strokeColor: 'blue',
        strokeWeight: 1
      });
    });

    map.data.addListener('click', function (event) { 
      getLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      var color = event.feature.l.isColorful === true ? false : true;
      event.feature.setProperty('isColorful', color);
    });     
  })
}  