

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success)
          success(JSON.parse(xhr.responseText));
      } else {
        if (error)
          error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

var datass = [];
function clear(map, data) {
  map.data.forEach(function (feature) {
    // If you want, check here for some constraints.
    map.data.remove(feature);
  });
  //loop(map, data);
}
var index = 0;
function loop(map, data) {
  loadJSON('js/data.json', function (data2) {
    //console.log("d")
    clear(map, data);
    for (var i = data.length - 1; i >= 0; i--) {
      var dataset = [];
      var geoBox = data[i].geometry.coordinates[0];
      for (var x = geoBox.length - 1; x >= 0; x--) {
        dataset.push(
          { lat: geoBox[x][1], lng: geoBox[x][0] }
        )
      }
      var el = datass[keys[index]];
      if (!el) {
        return;
      }
      var finding = el.find((e) => {
        // j.feature.id
        return e.id == data[i].properties.id
      });
     // console.log("finding " + finding);
      
      // Construct the polygon.
      var bermudaTriangle = new google.maps.Polygon({
        paths: dataset,
        strokeColor: getRandomColor(finding ? finding.count : 1),
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ffffff00',
        //fillColor: getRandomColor(finding ? finding.count : 1),
        //fillOpacity: 0.35
      });
      bermudaTriangle.setMap(map);
      //   var geometry = new google.maps.Data.Polygon([dataset]);
      //  geometry.feature = { id: data[i].properties.id }
      // console.log("geometry");
      // map.data.add({ geometry, fillColor: getRandomColor('blue'), })
    }
    /* map.data.setStyle(function (feature) {
       if (feature.getProperty('isColorful')) {
         return ({
           fillColor: 'red',
           strokeColor: 'red',
           strokeWeight: 1
         });
       }
       var el =  datass[keys[index]];
      var finding = el.find((e) => {
         // j.feature.id
         e.id == feature.j.feature.id
       });
       console.log("finding " + finding);
      // console.log("e" + el[0].id + " " + feature.j.feature.id); 
       return ({
         fillColor: getRandomColor('blue'),
         strokeColor: 'blue',
         strokeWeight: 1
       });
     });*/
    index++;


  },
    function (xhr) { console.error(xhr); }
  );
}
/*
function parser() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        //if (success)

        var file = xhr.responseText
        var reader = new FileReader();

        reader.onload = (event) => {
          var file = event.target.result;
          var allLines = file.split(/\r\n|\n/);
          // Reading line by line
          // allLines.forEach((line) => {
          console.log("line");
          //});
          //   success();
        };

        reader.onerror = (event) => {
          alert(event.target.error.name);
        };

        reader.readAsText(file);
      } else {
        if (error)
          error(xhr);
      }
    }
  };
  xhr.open("GET", "data/Uusimaa_footfall_data_hourly_250m_grid_20180101_20180110.txt", true);
  xhr.send();

}
parser();*/

function getRandomColor(val) {
  function heatMapColorforValue() {
    var vvv = Number.parseInt(val) / 10000
    vvv = vvv < 0 ? 1 : vvv;
    var h = (1.0 - vvv) * 240
    return "hsl(" + h + ", 100%, 50%)";
  }
  /*var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }*/
  return heatMapColorforValue();
}

var keys = [];

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: { lat: 60.192059, lng: 24.945831 },
  });
  loadJSON('js/data.json', function (data) {
    //test.push(partsOfStr)
    loadJSON('data/data3.json', function (data2) {
      //console.log("AA " + data2[0])
      //var datass = [];
      for (var index = 0; index < data2.length; index++) {
        var element = data2[index];
        var f = element;

        if (!datass[f[1]]) {
          keys.push(f[1]);
          datass[f[1]] = [];
        }
        datass[f[1]].push({ date: f[1], id: f[0], count: f[2] });
      }
      //console.log("d" + datass.length);
      /// console.log ('ss' + data.find((d) => d.properties.id === partsOfStr))
      // console.log("t" + partsOfStr[0]);
      setInterval(function () {
        loop(map, data);
      }, 1000);
    })

    /*
        const fileUrl = "/data/Uusimaa_footfall_data_hourly_250m_grid_20180101_20180110.txt" // provide file location
        var test = [];
        fetch(fileUrl)
          .then(r => r.text())
          .then(t => {
            var allLines = t.split(/\r\n|\n/);
            console.log("allLines" + allLines[0].split(',')[0]);
            for (var index = 0; index < allLines.length; index++) {
              var element = allLines[index];
              var partsOfStr = element.split(',');
              if (data.find((d) => d.properties.id == partsOfStr[0])) {
                test.push(partsOfStr)
              }
            }
    
            console.log(test)
            /// console.log ('ss' + data.find((d) => d.properties.id === partsOfStr))
            // console.log("t" + partsOfStr[0]);
          })
          */

    function repeatOften() {
      // loop(map, data);
      setTimeout(() => {
        clear(map, data);

        requestAnimationFrame(repeatOften);
        loop(map, data);


      }, 100);
    }
    //requestAnimationFrame(repeatOften);

  });


  /*map.data.addListener('click', function (event) {
    getLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    var color = event.feature.l.isColorful === true ? false : true;
    event.feature.setProperty('isColorful', color);
  });*/
}  