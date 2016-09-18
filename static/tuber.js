//tuber js file

var map;
var startMarker;
var endMarker;

var startBox;
var destinationBox;

function initializeMap(){
  map = new google.maps.Map(document.getElementById('gmap'), {
          center: {lat: 42.359667, lng: -71.087549},
          zoom: 14
        });
  startBox = document.getElementById('startLocation');
  endBox   = document.getElementById('endLocation');
}

function setStart(){
  console.log("Setting start point");
  var center = map.getCenter();
  startMarker = new google.maps.Marker({
    position: center,
    map: map,
    label: "Start Point",
    draggable: true
  });
  startBox.value = center.lat().toFixed(5)+", "+center.lng().toFixed(5);
  startMarker.addListener('dragend',function(){
    var p = startMarker.getPosition();
    startBox.value = p.lat().toFixed(5)+", "+p.lng().toFixed(5);
  });
}

function setDestination(){
  console.log("Setting end point");
  var center = map.getCenter();
  endMarker = new google.maps.Marker({
    position: center,
    map: map,
    label: "End Point",
    draggable: true
  });
  endBox.value = center.lat().toFixed(5)+", "+center.lng().toFixed(5);
  endMarker.addListener('dragend',function(){
    var p = endMarker.getPosition();
    endBox.value = p.lat().toFixed(5)+", "+p.lng().toFixed(5);
  });
}
